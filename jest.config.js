module.exports = {
  testEnvironment: "node",

  testMatch: [
    "**/tests/unitarias/**/*.test.js",
    "**/tests/integracion/**/*.test.js",
    "**/tests/e2e/**/*.test.js",
  ],

  clearMocks: true,

  detectOpenHandles: true,
};
