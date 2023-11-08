module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "import/prefer-default-export": "off",
    "react/function-component-definition": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "no-unused-vars": ["warn"],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "no-unused-expressions": 0,
    "@typescript-eslint/no-unused-expressions": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "no-param-reassign": 0,
    "no-promise-executor-return": 0,
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": 0,
    "no-underscore-dangle": 0,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
