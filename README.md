# 🎧 Spotify → MP3 Downloader

Una aplicación web moderna y **100% funcional** para descargar playlists de Spotify en formato MP3, utilizando GitHub Actions para el procesamiento real.

## ✨ Características

- 🌐 **Interfaz web moderna** - Diseño responsive y atractivo
- 🆓 **100% gratuito** - Utiliza GitHub Actions y GitHub Pages
- 🎵 **Descarga REAL** - Playlists, álbumes y canciones individuales
- 📱 **Responsive** - Funciona en cualquier dispositivo
- 🎚️ **Calidad configurable** - 128, 192 o 320 kbps
- 📦 **Archivo ZIP real** - Todas las canciones empaquetadas
- 🧹 **Auto-limpieza** - Archivos temporales se eliminan automáticamente
- ⚡ **Procesamiento en la nube** - GitHub Actions maneja todo el trabajo

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
4. Selecciona la rama **gh-pages** (se creará automáticamente)
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
5. **La aplicación activará GitHub Actions** automáticamente
6. **Ve a la pestaña "Actions"** en tu repositorio de GitHub
7. **Espera a que termine** el procesamiento
8. **Descarga el ZIP** desde GitHub Actions

### Para desarrolladores:

1. **Modifica el frontend** - Edita `index.html`, `styles.css`, `script.js`
2. **Personaliza el workflow** - Modifica `.github/workflows/download-playlist.yml`
3. **Haz commit y push** - Los cambios se desplegarán automáticamente

## 🏗️ Arquitectura

```
Frontend (GitHub Pages)
├── index.html          # Página principal
├── styles.css          # Estilos CSS
└── script.js           # Lógica JavaScript + Activación de GitHub Actions

Backend (GitHub Actions)
├── download-playlist.yml  # Workflow de descarga real
└── spotdl + ffmpeg       # Herramientas de descarga

Flujo de Trabajo
1. Usuario envía URL → Frontend
2. Frontend activa → GitHub Actions
3. GitHub Actions descarga → Música real
4. GitHub Actions genera → ZIP real
5. Usuario descarga → ZIP desde GitHub
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
- 🔄 **Procesamiento asíncrono** - No es en tiempo real, pero es real
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

## 🔍 Cómo Funciona Realmente

### **Flujo Completo:**

1. **Usuario pega URL** en la web
2. **Frontend valida** la URL de Spotify
3. **JavaScript activa** GitHub Actions via API
4. **GitHub Actions se ejecuta** en la nube
5. **spotdl descarga** la música real
6. **Se genera ZIP** con todas las canciones
7. **Usuario descarga** el ZIP desde GitHub Actions

### **Ventajas de esta Arquitectura:**

- 🆓 **Completamente gratuito** - Sin servidores propios
- ⚡ **Escalable** - GitHub maneja el tráfico
- 🔒 **Seguro** - Procesamiento en la nube de GitHub
- 📱 **Accesible** - Desde cualquier dispositivo
- 🧹 **Sin mantenimiento** - GitHub lo gestiona todo

---

**⚠️ Nota legal**: Esta herramienta es para uso personal y educativo. Respeta los derechos de autor y las políticas de Spotify.
