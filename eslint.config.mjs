import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

// Importamos elementos de la configuración antigua
const eslintConfigs = compat.extends('next/core-web-vitals');

export default [
  {
    // Configuración para ignorar archivos
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'public/',
      'build/',
      'dist/',
      '.vercel/',
      '.husky/',
      '.git/',
      '*.json',
      '*.md',
    ],
  },
  ...eslintConfigs,
  {
    // Configuración para archivos TypeScript
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    // Reglas adicionales migradas desde .eslintrc.json
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // Configuración para archivos JavaScript
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    // Reglas para JavaScript
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },
];
