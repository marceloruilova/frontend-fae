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
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier':['warn',{"endOfLine":"auto"}],
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    indent: ['warn', 2],
    'react/jsx-filename-extension': [0],
    camelcase: 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }],
  },
};
