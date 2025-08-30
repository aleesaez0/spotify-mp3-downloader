# 🎧 Spotify → MP3 Downloader

Una aplicación web moderna y gratuita para descargar playlists de Spotify en formato MP3, utilizando GitHub Actions para el procesamiento.

## ✨ Características

- 🌐 **Interfaz web moderna** - Diseño responsive y atractivo
- 🆓 **100% gratuito** - Utiliza GitHub Actions y GitHub Pages
- 🎵 **Descarga completa** - Playlists, álbumes y canciones individuales
- 📱 **Responsive** - Funciona en cualquier dispositivo
- 🎚️ **Calidad configurable** - 128, 192 o 320 kbps
- 📦 **Archivo ZIP** - Todas las canciones empaquetadas
- 🧹 **Auto-limpieza** - Archivos temporales se eliminan automáticamente

## 🚀 Instalación

### 1. Fork del repositorio

1. Haz fork de este repositorio en tu cuenta de GitHub
2. Clona tu fork localmente:
```bash
git clone https://github.com/TU_USUARIO/spotify-mp3-downloader.git
cd spotify-mp3-downloader
```

### 2. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **Deploy from a branch**
4. Selecciona la rama **main** y la carpeta **/ (root)**
5. Haz clic en **Save**

### 3. Configurar GitHub Actions

1. Ve a **Settings** → **Actions** → **General**
2. En **Actions permissions**, selecciona **Allow all actions and reusable workflows**
3. Haz clic en **Save**

### 4. Configurar GitHub Token (Opcional)

Para funcionalidades avanzadas, crea un token personalizado:

1. Ve a **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Haz clic en **Generate new token**
3. Selecciona los scopes: `repo`, `workflow`
4. Copia el token generado

## 🎯 Uso

### Para usuarios finales:

1. **Accede a la web** - Tu aplicación estará disponible en `https://TU_USUARIO.github.io/spotify-mp3-downloader`
2. **Pega la URL** de tu playlist de Spotify
3. **Selecciona la calidad** de audio deseada
4. **Haz clic en "Descargar Playlist"**
5. **Espera** a que se procese (puede tomar unos minutos)
6. **Descarga el ZIP** con todas las canciones

### Para desarrolladores:

1. **Modifica el frontend** - Edita `index.html`, `styles.css`, `script.js`
2. **Personaliza el workflow** - Modifica `.github/workflows/download-playlist.yml`
3. **Haz commit y push** - Los cambios se desplegarán automáticamente

## 🏗️ Arquitectura

```
Frontend (GitHub Pages)
├── index.html          # Página principal
├── styles.css          # Estilos CSS
└── script.js           # Lógica JavaScript

Backend (GitHub Actions)
├── download-playlist.yml  # Workflow de descarga
└── spotify_downloader.py  # Script de Python (futuro)

Dependencias
├── spotdl              # Descarga de Spotify
├── ffmpeg              # Conversión de audio
└── Python 3.11+        # Entorno de ejecución
```

## 🔧 Personalización

### Cambiar colores y estilos:

Edita `styles.css` y modifica las variables CSS:

```css
:root {
    --primary-color: #1DB954;    /* Color principal */
    --secondary-color: #191414;  /* Color secundario */
    --accent-color: #1ed760;     /* Color de acento */
}
```

### Modificar el workflow:

Edita `.github/workflows/download-playlist.yml` para:

- Cambiar la versión de Python
- Agregar más opciones de calidad
- Modificar el formato de nombres de archivo
- Agregar notificaciones por email

### Agregar funcionalidades:

1. **Autenticación** - Integrar con OAuth de Spotify
2. **Historial** - Base de datos para usuarios
3. **Límites** - Control de descargas por usuario
4. **Notificaciones** - Email cuando termine la descarga

## 📱 Responsive Design

La aplicación está optimizada para:

- 📱 **Móviles** - Diseño adaptativo
- 💻 **Tablets** - Interfaz táctil
- 🖥️ **Desktop** - Experiencia completa
- 🌐 **Todos los navegadores** - Compatibilidad universal

## 🚨 Limitaciones

- ⏱️ **Tiempo de procesamiento** - Depende del tamaño de la playlist
- 📦 **Tamaño máximo** - GitHub Actions tiene límites de tiempo (6 horas)
- 🔄 **No en tiempo real** - Procesamiento asíncrono
- 📊 **Uso de GitHub Actions** - 2000 minutos/mes gratis

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- **spotdl** - Herramienta de descarga de Spotify
- **GitHub Actions** - Automatización gratuita
- **GitHub Pages** - Hosting gratuito
- **Bootstrap** - Framework CSS
- **Font Awesome** - Iconos

## 📞 Soporte

Si tienes problemas o preguntas:

1. **Issues** - Crea un issue en GitHub
2. **Discussions** - Usa la pestaña Discussions
3. **Wiki** - Consulta la documentación

---

**⚠️ Nota legal**: Esta herramienta es para uso personal y educativo. Respeta los derechos de autor y las políticas de Spotify.
