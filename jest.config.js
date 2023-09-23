const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@containers/(.*)$': '<rootDir>/src/containers/$1',
    '.+\\.(png|jpg|ttf|woff|woff2)$': '<rootDir>/mockFile.ts',
  },
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      lines: 27,
    },
  },
  roots: ['<rootDir>'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|tsx)$|(/test/.*\\.tsx$)',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/src/utils/svgTransform.js',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.tsx'],
  testTimeout: 50000,
};
