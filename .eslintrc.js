module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    indent: ['error', 2],
    'react/jsx-filename-extension': [0],
    'no-unused-vars': 'warn',
    camelcase: 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }],
  },
};
