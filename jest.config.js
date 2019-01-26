module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  notify: true,
  testPathIgnorePatterns: [
    '.*\.mock\.(tsx?|jsx?)'
  ],
  setupFiles: [
    './utils/tests/polyfills.ts',
    './di/container.ts',
    './utils/tests/configMock.ts',
    './utils/tests/setupEnzyme.ts'
  ],
  coveragePathIgnorePatterns: [
    '.*\.dto\.ts',
    '.*\.mock\.(tsx?|jsx?)'
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
