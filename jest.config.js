module.exports = {
  collectCoverageFrom: [
    '<rootDir>/tests/unit/*.spec.ts'
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
  moduleNameMapper: {
    "^@core/(.*)$": ["<rootDir>/src/app/core/$1"],
    "^@shared/(.*)$": ["<rootDir>/src/app/shared/$1"],
    "^@modules/(.*)$": ["<rootDir>/src/app/modules/$1"],
    "^@env/(.*)$": ["<rootDir>/src/environments/$1"]
  },
  modulePathIgnorePatterns: ["<rootDir>/submodules/"]
};