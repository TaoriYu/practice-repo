module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    './stores/provider/container.ts',
    './utils/tests/configMock.ts',
    './utils/tests/configurationMock.ts'
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
