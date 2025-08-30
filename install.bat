@echo off
echo ========================================
echo    Spotify MP3 Downloader - Instalador
echo ========================================
echo.

echo [1/4] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python no esta instalado.
    echo.
    echo Por favor instala Python desde: https://python.org
    echo IMPORTANTE: Marca "Add Python to PATH"
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Python encontrado
)

echo.
echo [2/4] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no esta instalado.
    echo.
    echo Por favor instala Node.js desde: https://nodejs.org
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Node.js encontrado
)

echo.
echo [3/4] Instalando SpotDL...
pip install spotdl
if errorlevel 1 (
    echo ❌ Error instalando SpotDL
    echo Intenta: python -m pip install spotdl
    pause
    exit /b 1
) else (
    echo ✅ SpotDL instalado
)

echo.
echo [4/4] Instalando dependencias...
npm install
if errorlevel 1 (
    echo ❌ Error instalando dependencias
    pause
    exit /b 1
) else (
    echo ✅ Dependencias instaladas
)

echo.
echo ========================================
echo    ✅ Instalacion Completada
echo ========================================
echo.
echo Iniciando la aplicacion...
echo.
echo La aplicacion se abrira en tu navegador
echo Si no se abre, ve a: http://localhost:3000
echo.
pause

echo Iniciando servidor...
npm start
