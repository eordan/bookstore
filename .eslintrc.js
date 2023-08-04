module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['css-modules'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:css-modules/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/indent': 'off',
    indent: ['error', 2],
    'react/display-name': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'global-require': 'off',
    'func-names': 'off',
  },
};
