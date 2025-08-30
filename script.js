

class SpotifyDownloader {
    constructor() {
        this.form = document.getElementById('downloadForm');
        this.spotifyUrlInput = document.getElementById('spotifyUrl');
        this.qualitySelect = document.getElementById('quality');
        this.progressContainer = document.getElementById('progressContainer');
        this.downloadContainer = document.getElementById('downloadContainer');
        this.errorContainer = document.getElementById('errorContainer');
        this.statusText = document.getElementById('statusText');
        this.progressBar = document.querySelector('.progress-bar');
        this.downloadLink = document.getElementById('downloadLink');
        this.errorText = document.getElementById('errorText');
        
        this.startTime = null;
        this.estimatedDuration = 0;
        this.progressInterval = null;
        
        this.setupEventListeners();
        this.checkUrl();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.spotifyUrlInput.addEventListener('input', () => this.checkUrl());
    }

    checkUrl() {
        const url = this.spotifyUrlInput.value.trim();
        const isValid = this.isValidSpotifyUrl(url);
        
        if (url && !isValid) {
            this.spotifyUrlInput.classList.add('is-invalid');
        } else {
            this.spotifyUrlInput.classList.remove('is-invalid');
        }
    }

    isValidSpotifyUrl(url) {
        const spotifyRegex = /^https:\/\/open\.spotify\.com\/(playlist|album|track)\/[a-zA-Z0-9]+(\?.*)?$/;
        return spotifyRegex.test(url);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const url = this.spotifyUrlInput.value.trim();
        const quality = this.qualitySelect.value;
        
        if (!this.isValidSpotifyUrl(url)) {
            this.showError('Por favor, introduce una URL válida de Spotify');
            return;
        }

        this.startDownload(url, quality);
    }

    async startDownload(spotifyUrl, quality) {
        try {
            this.showProgress();
            this.startTime = Date.now();
            
            // Estimar duración basada en la calidad (simulación)
            this.estimatedDuration = this.estimateDownloadTime(quality);
            
            this.updateStatus('Iniciando descarga...', 0);
            
            // Simular progreso realista
            this.startRealisticProgress();
            
            // Aquí es donde se integraría con GitHub Actions
            // Por ahora simulamos el proceso
            await this.processDownload(spotifyUrl, quality);
            
        } catch (error) {
            console.error('Error en la descarga:', error);
            this.showError('Error en la descarga: ' + error.message);
        }
    }

    estimateDownloadTime(quality) {
        // Simulación: tiempo estimado basado en calidad
        const baseTime = 30000; // 30 segundos base
        switch(quality) {
            case '320': return baseTime * 1.5; // 45 segundos
            case '192': return baseTime * 1.2; // 36 segundos
            case '128': return baseTime;        // 30 segundos
            default: return baseTime;
        }
    }

    startRealisticProgress() {
        let progress = 0;
        const targetProgress = 90; // Llegar hasta 90% durante la simulación
        
        this.progressInterval = setInterval(() => {
            if (progress < targetProgress) {
                // Progreso más realista con aceleración/desaceleración
                const remaining = targetProgress - progress;
                const increment = Math.max(0.5, remaining * 0.1);
                progress += increment;
                
                this.updateStatusWithTime('Descargando playlist...', progress);
            } else {
                clearInterval(this.progressInterval);
            }
        }, 1000);
    }

    updateStatusWithTime(message, percentage) {
        this.updateStatus(message, percentage);
        
        // Calcular tiempo restante
        if (this.startTime && this.estimatedDuration > 0) {
            const elapsed = Date.now() - this.startTime;
            const remaining = Math.max(0, this.estimatedDuration - elapsed);
            const remainingSeconds = Math.ceil(remaining / 1000);
            
            if (remainingSeconds > 0) {
                this.statusText.textContent = `${message} - Tiempo restante: ${this.formatTime(remainingSeconds)}`;
            }
        }
    }

    formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds}s`;
        } else {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}m ${remainingSeconds}s`;
        }
    }

    async processDownload(spotifyUrl, quality) {
        // Simulación del proceso de descarga
        // En la implementación real, esto se conectaría con GitHub Actions
        
        await this.delay(2000);
        this.updateStatusWithTime('Descargando playlist...', 30);
        
        await this.delay(2000);
        this.updateStatusWithTime('Procesando canciones...', 60);
        
        await this.delay(2000);
        this.updateStatusWithTime('Generando archivo ZIP...', 80);
        
        await this.delay(1000);
        this.updateStatus('Completado', 100);
        
        // Simular archivo descargado
        await this.delay(500);
        this.showDownloadReady('playlist_download.zip');
    }

    updateStatus(message, percentage) {
        this.statusText.textContent = message;
        this.progressBar.style.width = `${percentage}%`;
        this.progressBar.setAttribute('aria-valuenow', percentage);
        
        // Cambiar color de la barra según el progreso
        if (percentage < 30) {
            this.progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-warning';
        } else if (percentage < 80) {
            this.progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-info';
        } else if (percentage < 100) {
            this.progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-primary';
        } else {
            this.progressBar.className = 'progress-bar bg-success';
        }
    }

    showProgress() {
        this.hideAll();
        this.progressContainer.style.display = 'block';
        this.form.classList.add('loading');
        
        // Resetear la barra de progreso
        this.progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-warning';
    }

    showDownloadReady(filename) {
        this.hideAll();
        this.downloadContainer.style.display = 'block';
        this.form.classList.remove('loading');
        
        // Limpiar intervalos
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        // En la implementación real, este sería el enlace al artifact de GitHub Actions
        this.downloadLink.href = `#${filename}`;
        this.downloadLink.download = filename;
        
        // Simular descarga
        this.downloadLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.simulateDownload(filename);
        });
    }

    simulateDownload(filename) {
        // En la implementación real, esto descargaría el archivo real
        this.downloadLink.textContent = 'Descargando...';
        this.downloadLink.disabled = true;
        
        setTimeout(() => {
            this.downloadLink.textContent = '¡Descargado!';
            this.downloadLink.classList.add('btn-secondary');
            this.downloadLink.classList.remove('btn-success');
        }, 2000);
    }

    showError(message) {
        this.hideAll();
        this.errorContainer.style.display = 'block';
        this.errorText.textContent = message;
        this.form.classList.remove('loading');
        
        // Limpiar intervalos
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }

    hideAll() {
        this.progressContainer.style.display = 'none';
        this.downloadContainer.style.display = 'none';
        this.errorContainer.style.display = 'none';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new SpotifyDownloader();
});

// Función para integrar con GitHub Actions (implementación futura)
async function triggerGitHubAction(spotifyUrl, quality) {
    // Esta función se implementará para conectar con GitHub Actions
    // Por ahora es un placeholder
    
    const workflowData = {
        spotify_url: spotifyUrl,
        quality: quality,
        timestamp: new Date().toISOString()
    };
    
    console.log('Datos para GitHub Actions:', workflowData);
    
    // Aquí se haría la llamada a la API de GitHub para activar el workflow
    // return await fetch('https://api.github.com/repos/USER/REPO/actions/workflows/WORKFLOW_ID/dispatches', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': 'token YOUR_GITHUB_TOKEN',
    //         'Accept': 'application/vnd.github.v3+json'
    //     },
    //     body: JSON.stringify({
    //         ref: 'main',
    //         inputs: workflowData
    //     })
    // });
}
