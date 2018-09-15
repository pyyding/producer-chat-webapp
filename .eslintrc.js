module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: { 'no-debugger': 0, 'no-tabs': 0, 'indent': 0, 'no-mixed-spaces-and-tabs': 0},
  globals: {}
}
