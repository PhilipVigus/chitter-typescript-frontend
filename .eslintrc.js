module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint", "jest"],
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:jest/recommended"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "no-underscore-dangle": "off",
    "no-else-return": "off",
    "no-console": "off",
    "react/jsx-one-expression-per-line": "off"
  }
};
