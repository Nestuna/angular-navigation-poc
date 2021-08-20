module.exports = {

  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/index.ts',
    '!<rootDir>/src/app/**/*.module.ts'
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
    '<rootDir>/tests/unit/*.spec.ts'
  ],
  "modulePathIgnorePatterns": ["<rootDir>/submodules/"]
};