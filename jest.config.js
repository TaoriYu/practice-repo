module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    './utils/tests/polyfills.ts',
    './stores/provider/container.ts',
    './utils/tests/configMock.ts'
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
