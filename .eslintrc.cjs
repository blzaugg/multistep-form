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
    /* Config order is VERY important. General first, then more specific. */
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    /* Prettier configs should go last. */
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
    /* shadcn (3rd-party) exceptions. */
    {
      files: ['src/components/shadcn/**/*.{vue, js}'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ],
  }
}
