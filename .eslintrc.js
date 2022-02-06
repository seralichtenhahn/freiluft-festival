module.exports = {
  root: true,
  // parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module"
  },
  extends: ["@nuxtjs", "prettier"],
  rules: {
    "vue/multi-word-component-names": "off"
  }
}
