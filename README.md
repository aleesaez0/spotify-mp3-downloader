# 🎵 Spotify MP3 Downloader

**¡Descarga música REAL de Spotify en MP3!**

Una aplicación simple que descarga playlists de Spotify usando SpotDL y te da un ZIP con todas las canciones.

## 🚀 **Instalación Súper Fácil**

### **Para Windows:**
1. **Descarga** este repositorio
2. **Extrae** la carpeta en tu escritorio
3. **Haz doble clic** en `install.bat`
4. **¡Listo!** Se abre automáticamente en tu navegador

### **Para macOS/Linux:**
1. **Descarga** este repositorio
2. **Abre terminal** en la carpeta
3. **Ejecuta:** `chmod +x install.sh && ./install.sh`

## 📋 **Lo que necesitas:**

- **Python** - [Descargar aquí](https://python.org) ✅ Marcar "Add to PATH"
- **Node.js** - [Descargar aquí](https://nodejs.org)

## 🎯 **Cómo usar:**

1. **Pega** la URL de tu playlist de Spotify
2. **Selecciona** la calidad (128, 192 o 320 kbps)
3. **Haz clic** en "Descargar Playlist"
4. **Espera** a que SpotDL descargue la música
5. **Descarga** el ZIP con todas las canciones

## 📁 **Archivos del proyecto:**

- `install.bat` - Instalador automático para Windows
- `install.sh` - Instalador para macOS/Linux
- `server.js` - Servidor que usa SpotDL
- `script.js` - Interfaz web
- `index.html` - Página principal
- `styles.css` - Estilos de la aplicación
- `package.json` - Dependencias de Node.js

## 🔧 **Si algo falla:**

### **Python no funciona:**
```cmd
pip install spotdl
```

### **Node.js no funciona:**
```cmd
npm install
```

### **Puerto ocupado:**
Cambia el puerto en `server.js` línea 8:
```javascript
const PORT = process.env.PORT || 3001;
```

## 🎵 **¡Disfruta de tu música!**

**La aplicación:**
- ✅ **Descarga música REAL** de Spotify
- ✅ **Crea ZIPs automáticamente**
- ✅ **Funciona en Windows, macOS y Linux**
- ✅ **Interfaz web simple**

**¡Tu música favorita está a solo unos clics! 🎵**
