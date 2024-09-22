module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/src/**/*.test.ts"],
  transform: {
    "^.+\\.(ts)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: ["**/*.ts"],
};
