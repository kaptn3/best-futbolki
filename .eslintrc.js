module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 'off',
    'vue/script-indent': ['warn', 2, {
      'baseIndent': 1
    }],
    "import/no-unresolved": "off",
    'no-plusplus': 'off',
    'quote-props': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
