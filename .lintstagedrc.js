// Configuración de lint-staged que funciona con la nueva configuración plana de ESLint
module.exports = {
  // Configuración específica para cada tipo de archivo
  // Esto hace que sea más robusto cuando no hay archivos de un tipo específico
  '**/*.{ts,tsx}': ['prettier --write'],
  '**/*.{js,jsx,mjs,cjs}': ['prettier --write'],
  '**/*.{json,md}': ['prettier --write'],
  '**/*.{css,scss}': ['prettier --write'],
};
