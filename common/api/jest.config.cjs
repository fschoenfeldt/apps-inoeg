/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  rootDir: "src",
};
