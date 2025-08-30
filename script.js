

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
        
        this.setupEventListeners();
        this.checkUrl();
        this.checkSpotDLStatus();
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

    async checkSpotDLStatus() {
        try {
            const response = await fetch('/api/check-spotdl');
            const data = await response.json();
            
            if (!data.installed) {
                this.showSpotDLError(data.error);
            }
        } catch (error) {
            console.error('Error verificando SpotDL:', error);
        }
    }

    showSpotDLError(message) {
        const errorHtml = `
            <div class="alert alert-warning">
                <h6><i class="fas fa-exclamation-triangle me-2"></i>SpotDL no está instalado</h6>
                <p>Para que la aplicación funcione, necesitas instalar SpotDL:</p>
                <div class="bg-dark text-light p-3 rounded">
                    <code>pip install spotdl</code>
                </div>
                <p class="mt-2 mb-0">
                    <strong>Alternativa:</strong> Ejecuta <code>npm run install-all</code> en la terminal
                </p>
            </div>
        `;
        
        // Insertar después del formulario
        this.form.insertAdjacentHTML('afterend', errorHtml);
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
            this.updateStatus('Iniciando descarga con SpotDL...', 10);
            
            // Extraer información de la URL
            const spotifyInfo = this.extractSpotifyInfo(spotifyUrl);
            
            this.updateStatus('Conectando con servidor local...', 20);
            
            // Enviar solicitud al servidor local
            const response = await fetch('/api/download-playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spotifyUrl: spotifyUrl,
                    quality: quality
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error en el servidor');
            }
            
            this.updateStatus('Descargando música real de YouTube...', 50);
            
            // Simular progreso mientras SpotDL descarga
            this.simulateProgress();
            
            // Esperar a que se complete la descarga
            await this.waitForDownload(response);
            
            this.updateStatus('Descarga completada', 100);
            
            // Mostrar enlace de descarga
            this.showDownloadReady();
            
        } catch (error) {
            console.error('Error en la descarga:', error);
            this.showError('Error en la descarga: ' + error.message);
        }
    }

    extractSpotifyInfo(spotifyUrl) {
        try {
            const urlParts = spotifyUrl.split('/');
            const type = urlParts[urlParts.length - 2];
            const id = urlParts[urlParts.length - 1].split('?')[0];
            
            return {
                name: `Playlist_${id}`,
                type: type,
                id: id
            };
        } catch (error) {
            throw new Error('No se pudo analizar la URL de Spotify');
        }
    }

    simulateProgress() {
        let progress = 50;
        const interval = setInterval(() => {
            if (progress < 90) {
                progress += Math.random() * 5;
                this.updateStatus('Descargando música real de YouTube...', progress);
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    async waitForDownload(response) {
        // Crear un blob del response para descarga
        const blob = await response.blob();
        
        // Crear URL del blob
        const downloadUrl = URL.createObjectURL(blob);
        
        // Configurar enlace de descarga
        this.downloadLink.href = downloadUrl;
        this.downloadLink.download = 'playlist_music.zip';
        
        // Limpiar URL cuando se complete
        this.downloadLink.addEventListener('click', () => {
            setTimeout(() => {
                URL.revokeObjectURL(downloadUrl);
            }, 1000);
        });
    }

    updateStatus(message, percentage) {
        this.statusText.textContent = message;
        this.progressBar.style.width = `${percentage}%`;
        this.progressBar.setAttribute('aria-valuenow', percentage);
        
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
        
        this.progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-warning';
    }

    showDownloadReady() {
        this.hideAll();
        this.downloadContainer.style.display = 'block';
        this.form.classList.remove('loading');
        
        // El enlace ya está configurado en waitForDownload
    }

    showError(message) {
        this.hideAll();
        this.errorContainer.style.display = 'block';
        this.errorText.textContent = message;
        this.form.classList.remove('loading');
    }

    hideAll() {
        this.progressContainer.style.display = 'none';
        this.downloadContainer.style.display = 'none';
        this.errorContainer.style.display = 'none';
    }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new SpotifyDownloader();
});
