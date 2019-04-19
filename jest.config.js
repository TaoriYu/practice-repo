const isReporterUsed = process.env.JEST_REPORT_FILE !== undefined;

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testResultsProcessor: isReporterUsed ? 'jest-bamboo-reporter' : undefined,
  testPathIgnorePatterns: [
    '.*\.mock\.(tsx?|jsx?)',
  ],
  moduleNameMapper: {
    '\.(css|less)$': 'identity-obj-proxy',
  },
  setupFiles: [
    './utils/tests/polyfills.ts',
    './utils/tests/configMock.ts',
    './utils/tests/setupEnzyme.ts',
  ],
  coveragePathIgnorePatterns: [
    '.*\.dto\.ts',
    '.*\.mock\.(tsx?|jsx?)',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
