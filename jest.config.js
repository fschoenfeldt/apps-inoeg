// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "@testing-library/jest-dom/extend-expect",
    "jest-axe/extend-expect",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/dist/",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
      },
    ],
    // "^.+\\.mdx$": "@storybook/addon-docs/jest-transform-mdx",
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "dist",
    ".next",
    ".storybook",
    ".stories.mdx",
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};

module.exports = config;
