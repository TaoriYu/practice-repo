module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    ".*\.mock\.(tsx?|jsx?)"
  ],
  setupFiles: [
    './utils/tests/polyfills.ts',
    './di/container.ts',
    './utils/tests/configMock.ts'
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
