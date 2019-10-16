module.exports = {
  extends: "airbnb-base",
  rules: {
    "no-console": 0,
    "no-param-reassign": [2, { props: false }],
    "prefer-destructuring": 0,
    "linebreak-style": 0,
    "arrow-body-style": 0,
    "comma-dangle": 0,
    "consistent-return": 0,
    "no-unused-vars": 0,
    "radix": 0,
    "no-undef": 0,
    "no-new": 0,
    "class-methods-use-this": 0
  },
  env: {
    commonjs: true,
    node: true,
    mocha: true
  }
};
