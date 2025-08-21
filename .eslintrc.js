module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
  ],
  rules: {
    // React 规则
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要导入 React
    'react/prop-types': 'warn',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    
    // React Hooks 规则
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // 代码质量规则
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // 代码风格规则
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    
    // 可访问性规则
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    
    // 禁止硬编码文本规则 - 使用正则表达式检测
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/[\u4e00-\u9fa5]/]',
        message: '禁止硬编码中文文本，请使用国际化函数 t() 调用',
      },
      {
        selector: 'Literal[value=/\\b[a-zA-Z]{3,}\\b/]',
        message: '禁止硬编码英文文本，请使用国际化函数 t() 调用',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
