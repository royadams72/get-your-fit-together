import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules/", // Ignore node_modules
    "<rootDir>/.next/", // Ignore Next.js build files
    "<rootDir>/dist/", // Ignore build output
    "<rootDir>/coverage/", // Ignore coverage reports
    "<rootDir>/logs/", // Ignore log files
  ],
};

export default createJestConfig(config);
