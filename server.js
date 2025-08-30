const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para descargar playlist de Spotify
app.post('/api/download-playlist', async (req, res) => {
    try {
        const { spotifyUrl, quality } = req.body;
        
        if (!spotifyUrl) {
            return res.status(400).json({ error: 'URL de Spotify requerida' });
        }
        
        console.log(`Iniciando descarga de: ${spotifyUrl} con calidad: ${quality}`);
        
        // Crear directorio temporal para descargas
        const downloadDir = path.join(__dirname, 'downloads');
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
        }
        
        // Limpiar descargas anteriores
        const files = fs.readdirSync(downloadDir);
        files.forEach(file => {
            const filePath = path.join(downloadDir, file);
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        });
        
        // Configurar calidad de audio
        let qualityFlag = '';
        switch(quality) {
            case '320': qualityFlag = '--bitrate 320'; break;
            case '192': qualityFlag = '--bitrate 192'; break;
            case '128': qualityFlag = '--bitrate 128'; break;
            default: qualityFlag = '--bitrate 192';
        }
        
        // Comando para descargar con SpotDL
        const command = `spotdl --playlist "${spotifyUrl}" --output-format mp3 ${qualityFlag} --output "${downloadDir}"`;
        
        console.log('Ejecutando comando:', command);
        
        // Ejecutar SpotDL
        exec(command, { cwd: downloadDir }, async (error, stdout, stderr) => {
            if (error) {
                console.error('Error ejecutando SpotDL:', error);
                return res.status(500).json({ error: 'Error descargando música: ' + error.message });
            }
            
            console.log('SpotDL stdout:', stdout);
            if (stderr) console.log('SpotDL stderr:', stderr);
            
            try {
                // Verificar archivos descargados
                const downloadedFiles = fs.readdirSync(downloadDir)
                    .filter(file => file.endsWith('.mp3'))
                    .map(file => ({
                        path: path.join(downloadDir, file),
                        name: file
                    }));
                
                if (downloadedFiles.length === 0) {
                    return res.status(404).json({ error: 'No se encontraron archivos de música' });
                }
                
                console.log(`Archivos descargados: ${downloadedFiles.length}`);
                
                // Crear archivo ZIP
                const zipPath = path.join(downloadDir, 'playlist_music.zip');
                await createZipFile(downloadedFiles, zipPath);
                
                // Enviar ZIP al usuario
                res.download(zipPath, 'playlist_music.zip', (err) => {
                    if (err) {
                        console.error('Error enviando ZIP:', err);
                    }
                    
                    // Limpiar archivos temporales después de un tiempo
                    setTimeout(() => {
                        try {
                            downloadedFiles.forEach(file => {
                                if (fs.existsSync(file.path)) {
                                    fs.unlinkSync(file.path);
                                }
                            });
                            if (fs.existsSync(zipPath)) {
                                fs.unlinkSync(zipPath);
                            }
                        } catch (cleanupError) {
                            console.error('Error limpiando archivos:', cleanupError);
                        }
                    }, 60000); // Limpiar después de 1 minuto
                });
                
            } catch (zipError) {
                console.error('Error creando ZIP:', zipError);
                res.status(500).json({ error: 'Error creando archivo ZIP' });
            }
        });
        
    } catch (error) {
        console.error('Error en descarga:', error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para verificar estado de SpotDL
app.get('/api/check-spotdl', (req, res) => {
    exec('spotdl --version', (error, stdout, stderr) => {
        if (error) {
            res.json({ 
                installed: false, 
                error: 'SpotDL no está instalado. Ejecuta: pip install spotdl' 
            });
        } else {
            res.json({ 
                installed: true, 
                version: stdout.trim() 
            });
        }
    });
});

// Función para crear archivo ZIP
async function createZipFile(files, zipPath) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 6 } });
        
        output.on('close', () => {
            console.log('ZIP creado exitosamente');
            resolve();
        });
        
        archive.on('error', (err) => reject(err));
        
        archive.pipe(output);
        
        files.forEach(file => {
            archive.file(file.path, { name: file.name });
        });
        
        archive.finalize();
    });
}

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🎵 Spotify MP3 Downloader ejecutándose en: http://localhost:${PORT}`);
    console.log(`📱 Abre tu navegador y ve a: http://localhost:${PORT}`);
    console.log(`⚠️  Asegúrate de tener SpotDL instalado: pip install spotdl`);
    console.log(`🚀 Para instalar dependencias: npm install`);
});
