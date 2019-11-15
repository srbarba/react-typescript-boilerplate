const path = require('path');

module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/test/.*(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ['json', 'text', 'html'],
  moduleDirectories: [
    path.resolve(__dirname, 'lib'),
    path.resolve(__dirname, 'src'),
    'node_modules'
  ],
  moduleNameMapper: {
    '^lib/(.*)$': path.resolve(__dirname, 'lib/$1'),
    'app/(.*)': path.resolve(__dirname, 'src/app/$1'),
    '^pages/(.*)$': path.resolve(__dirname, 'src/app/pages/$1'),
    '^components/(.*)$': path.resolve(__dirname, 'src/components/$1'),
  }
}