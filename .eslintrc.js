module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      '@vue/standard',
      'plugin:prettier/recommended'
    ],
    parserOptions: {
      parser: 'babel-eslint',
    },
    rules: {
      'prettier/prettier': 'error',
      // 添加其他规则（如果需要）
    }
  };
  