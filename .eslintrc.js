const path = require("path");

module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
        jest: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: path.resolve(__dirname, "./tsconfig.json"),
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-var-requires": "off",
    camelcase: "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "no-void": "warn",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "variableLike",
        format: ["camelCase"],
      },
    ],
  },
};
