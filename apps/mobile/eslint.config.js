// eslint.config.js
// https://docs.expo.dev/guides/using-eslint/

const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  // Expo base config
  ...expoConfig,

  // Add Prettier compatibility
  ...prettierConfig,

  // Your custom settings
  {
    ignores: ['dist/**'],

    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // add any custom rules here
      // '@typescript-eslint/no-unused-vars': ['error'],
    },
  },
]);
