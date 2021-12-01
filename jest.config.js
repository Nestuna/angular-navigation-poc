/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/tests/e2e/*.spec.ts'
  ],

  coverageDirectory: 'coverage',

  coverageReporters: [
    'lcov',
    'text-summary'
  ],

  testPathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/app/*.(js|scss)'
  ],

  testMatch: [
    '<rootDir>/tests/e2e/*.spec.ts'
  ],
  "modulePathIgnorePatterns": ["<rootDir>/submodules/"]
};