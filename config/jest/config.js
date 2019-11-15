const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '..', '..'),
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.js'],
  setupFiles: ['react-app-polyfill/jsdom', 'airbnb-browser-shims'],
  setupFilesAfterEnv: [],
  testMatch: ['<rootDir>/src/**/*.{spec,test}.js'],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.js$',
    '^.+\\.module\\.(css|scss)$',
  ],
  modulePaths: [],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['web.js', 'js', 'json'],
  // watchPlugins: [
  //   'jest-watch-typeahead/filename',
  //   'jest-watch-typeahead/testname',
  // ],
}
