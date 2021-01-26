module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
  ],
  rules: {
    'max-nesting-depth': 4,
    'no-descending-specificity': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'user-drag',
          'font-smooth',
        ],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: [
          'v-deep',
        ],
      },
    ],
  },
};
