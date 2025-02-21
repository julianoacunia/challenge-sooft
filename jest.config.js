module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1"
  }
};
