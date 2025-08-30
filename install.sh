#!/bin/bash

echo "========================================"
echo "   Spotify MP3 Downloader - Instalador"
echo "========================================"
echo

echo "[1/5] Verificando Python..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python3 no está instalado."
    echo "Por favor, instala Python desde: https://python.org"
    echo "Después ejecuta este instalador nuevamente."
    exit 1
else
    echo "Python encontrado:"
    python3 --version
fi

echo
echo "[2/5] Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js no está instalado."
    echo "Por favor, instala Node.js desde: https://nodejs.org"
    echo "Después ejecuta este instalador nuevamente."
    exit 1
else
    echo "Node.js encontrado:"
    node --version
fi

echo
echo "[3/5] Instalando SpotDL..."
pip3 install spotdl
if [ $? -ne 0 ]; then
    echo "ERROR: No se pudo instalar SpotDL."
    echo "Intenta ejecutar: pip3 install spotdl"
    exit 1
else
    echo "SpotDL instalado correctamente."
fi

echo
echo "[4/5] Instalando dependencias de Node.js..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: No se pudieron instalar las dependencias."
    exit 1
else
    echo "Dependencias instaladas correctamente."
fi

echo
echo "[5/5] Iniciando la aplicación..."
echo
echo "¡Instalación completada! La aplicación se abrirá automáticamente."
echo
echo "Si no se abre automáticamente, ve a: http://localhost:3000"
echo
echo "Para ejecutar manualmente en el futuro:"
echo "  npm start"
echo

# Intentar abrir el navegador automáticamente
if command -v open &> /dev/null; then
    # macOS
    sleep 2
    open "http://localhost:3000"
elif command -v xdg-open &> /dev/null; then
    # Linux
    sleep 2
    xdg-open "http://localhost:3000"
fi

echo "Iniciando servidor..."
npm start
