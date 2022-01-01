// @ts-check

/**
 * @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config}
 */
const config = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  ignorePatterns: ["**/node_modules", "**/dist", "**/build"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      globalReturn: false,
    },
    ecmaVersion: 2020,
    project: ["tsconfig.json"],
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:regexp/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  // By loading jest globally as a plugin
  // we can load recommended on specific code base (regular / tests) through
  // overrides.
  plugins: ["jest", "testing-library", "storybook", "cypress"],
  rules: {
    "no-empty-function": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["private-constructors"] },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: ["*.js"],
      parser: "espree",
      parserOptions: {
        ecmaVersion: 2020,
      },
      rules: {
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-all-duplicated-branches": "off",
        "@typescript-eslint/consistent-type-exports": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "import/order": "off",
      },
    },
    {
      // For performance run jest/recommended on test files, not regular code
      files: ["**/*.test.{ts,tsx}"],
      extends: ["plugin:jest/all", "plugin:testing-library/react"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/no-empty-function": "off",
        "jest/prefer-called-with": "off",
      },
    },
    {
      files: ["**/*.stories.{ts,tsx,mdx}"],
      extends: ["plugin:storybook/recommended", "plugin:storybook/csf-strict"],
      rules: {
        "storybook/use-storybook-testing-library": "off",
      },
    },
    {
      files: ["**/cypress/**/*.{ts,tsx}"],
      extends: ["plugin:cypress/recommended"],
      env: {
        "cypress/globals": true,
      },
    },
  ],
};

module.exports = config;
