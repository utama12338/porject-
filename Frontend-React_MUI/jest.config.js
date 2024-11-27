module.exports = {
    testEnvironment: 'jsdom',
    setupFiles:["./.jest/setEnvVars.js"],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|svg|ttf)$': '<rootDir>/__mocks__/fileMock.js',
      "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
      'axios': 'axios/dist/node/axios.cjs'
    },
      transform: {
        '^.+\\.jsx?$': 'babel-jest'
      },
      "reporters": [
        "default",
        [
          "./node_modules/jest-html-reporter",
          {
            "pageTitle": "Test Report"
          }
        ]
      ]
    };
  