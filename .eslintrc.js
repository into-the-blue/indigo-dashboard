module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  rules: {
    'prefer-template': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'arrow-body-style': 'off',
    'import/order': 'off',
    '@typescript-eslint/camelcase': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'import/newline-after-import': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'react/no-array-index-key': 'off',
    'prefer-destructuring': 'off',
    'no-useless-return': 'off',
    eqeqeq: 'off',
    'no-useless-constructor': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'no-param-reassign':'off'
  },
};
