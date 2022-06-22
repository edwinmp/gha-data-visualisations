module.exports = {
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'newline-before-return': 'error',
    eqeqeq: ['error', 'always'],
    'prefer-template': 'error',
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
  globals: {
    d3: 'readonly',
  },
};
