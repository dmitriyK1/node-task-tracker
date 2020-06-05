module.exports = {
  plugins: [],
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "warn",
  },
};
