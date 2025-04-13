#!/bin/bash

# Script para verificar el código manualmente
# Esto es útil cuando queremos verificar el código sin tener que usar hooks de git

echo "🔍 Verificando tipos con TypeScript..."
npx tsc --noEmit
TS_RESULT=$?

echo "🧹 Ejecutando ESLint..."
npx next lint
LINT_RESULT=$?

if [ $TS_RESULT -eq 0 ] && [ $LINT_RESULT -eq 0 ]; then
  echo "✅ Todo el código pasó las verificaciones!"
  exit 0
else
  echo "❌ Se encontraron problemas en el código."
  exit 1
fi 