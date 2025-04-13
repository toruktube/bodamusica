@echo off
echo 🔍 Verificando tipos con TypeScript...
call npx tsc --noEmit
set TS_RESULT=%ERRORLEVEL%

echo 🧹 Ejecutando ESLint...
call npx next lint
set LINT_RESULT=%ERRORLEVEL%

if %TS_RESULT% EQU 0 if %LINT_RESULT% EQU 0 (
  echo ✅ Todo el código pasó las verificaciones!
  exit /b 0
) else (
  echo ❌ Se encontraron problemas en el código.
  exit /b 1
) 