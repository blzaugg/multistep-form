/*
 * Generated file.
 *
 * I then:
 *  - Fixed extends order.
 *  - Added recommended configs
 */

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:prettier/recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    /* JS files at root are Node files. */
    {
      files: ['*.{js,cjs}'],
      env: {
        node: true
      }
    },
  ],
  }
}
