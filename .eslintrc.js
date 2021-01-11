module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'consistent-return': 0,
    'no-unused-expressions': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'no-nested-ternary': 0,
    'global-require': 0,
    'react/forbid-prop-types': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'no-bitwise': 0,
    'import/no-cycle': 0,
  },
};
