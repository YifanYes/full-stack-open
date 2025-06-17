import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest'
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    extends: [js.configs.recommended],
    rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never']
    }
  },
  {
    ignores: ['dist/**']
  }
])
