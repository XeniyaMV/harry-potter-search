module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      "jsx": true
    },
    ecmaVersion: "latest",
	  sourceType: "module",
    project: './tsconfig.json',
    extraFileExtensions: [".json"]
  },
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    'no-debugger': 'warn',
    'no-console': 'warn',
    "comma-dangle": ["error", "only-multiline"],

    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        singleQuote: true,
        semi: true,
        endOfLine: 'lf',
        printWidth: 120,
        trailingComma: 'es5',
        arrowParens: 'always',
      },
    ],

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    "react/jsx-uses-react": "off",
    'react/react-in-jsx-scope': 'off',

    'react/prop-types': 'off',
    "react/display-name": "off",
    'react/self-closing-comp': ['error', {
      "component": true,
      "html": true
    }],

    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-var-requires": "off",

    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'off',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit',
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-explicit-any': 'error',

  },
}
