/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/database/connectDatabase.ts",
    "!src/loadEnvironment.ts",
    "!src/index.ts",
    "!src/server/startServer.ts",
    "!src/server/index.ts",
    "!src/routes/router.ts",
  ],
};
