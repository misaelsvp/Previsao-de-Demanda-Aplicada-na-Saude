@echo off
cd /d "%~dp0"

if not exist "_site\index.html" (
    echo Erro: Site nao compilado. Execute o Jekyll primeiro.
    echo Use: bundle exec jekyll build
    pause
    exit /b 1
)

echo.
echo Servindo site Jekyll compilado...
echo Site estara disponivel em: http://localhost:8000
echo Pressione Ctrl+C para parar o servidor
echo.

cd _site
python -m http.server 8000

