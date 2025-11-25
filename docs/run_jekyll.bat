@echo off
cd /d "%~dp0"

echo Verificando dependencias...

where bundle >nul 2>&1
if %errorlevel% neq 0 (
    echo Erro: Bundle nao encontrado. Instale o Ruby e o Bundler primeiro.
    echo.
    echo Para instalar:
    echo 1. Instale o Ruby: https://rubyinstaller.org/
    echo 2. Execute: gem install bundler
    echo 3. Execute: bundle install
    pause
    exit /b 1
)

echo Instalando dependencias do Gemfile...
bundle install

if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias.
    pause
    exit /b 1
)

echo.
echo Iniciando servidor Jekyll...
echo Site estara disponivel em: http://localhost:4000
echo Pressione Ctrl+C para parar o servidor
echo.

bundle exec jekyll serve --livereload --host 127.0.0.1 --port 4000 --baseurl ""

pause


