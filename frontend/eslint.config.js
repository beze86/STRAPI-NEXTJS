// eslint.config.js
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginSecurity from 'eslint-plugin-security';

// Configure `__dirname` and `__filename` for ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020, // Ensure the parser supports modern ECMAScript
      sourceType: 'module', // Ensure the code uses ES Modules
      parser: undefined, // Use the default parser for JavaScript files
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
      security: eslintPluginSecurity,
    },
    rules: {
      // React & JSX-related rules
      'react/react-in-jsx-scope': 'off', // React 18+ no need for React in scope
      'react/prop-types': 'off', // TypeScript handles prop validation
      'react/jsx-props-no-spreading': 'off', // Allow prop spreading cautiously
      'react/jsx-no-useless-fragment': ['warn'], // Avoid unnecessary fragments
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }, // Ignore unused vars with "_" prefix
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // Encourage explicit return types
      '@typescript-eslint/no-explicit-any': 'warn', // Discourage "any" usage
      // Import/export rules
      'import/prefer-default-export': 'off', // Default export usage allowed
      'import/no-default-export': 'warn', // Recommend named exports
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Built-in modules like `fs`, `path`
            'external', // External packages like `react`, `lodash`
            'internal', // Internal aliases or paths
            'parent', // Parent directory imports
            'sibling', // Your project's sibling file imports
            'index', // Current directory imports
            'unknown',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      // General code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Restrict `console` usage
      'no-debugger': 'error', // Disallow debugger usage
      'consistent-return': 'warn', // Enforce consistent return values in functions
      // Security rules
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-buffer-noassert': 'error',
      'security/detect-no-csrf-before-method-override': 'warn',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-child-process': 'warn',
      'security/detect-unsafe-regex': 'error',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve JS/TS files fully
        },
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json', // Point to your TypeScript config
      },
    },
  },
];
