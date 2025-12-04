const js = require("@eslint/js");
const security = require("eslint-plugin-security");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2020,
      globals: {
        console: "readonly",
        module: "readonly",
        require: "readonly",
        process: "readonly",
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        jest: "readonly",
        cy: "readonly",          
        Cypress: "readonly", 
      },
    },

    plugins: {
      security,
      cypress: true
    },

    rules: {
      ...js.configs.recommended.rules,

      "security/detect-object-injection": "warn",
      "security/detect-unsafe-regex": "warn",
      "security/detect-eval-with-expression": "error",
      "security/detect-child-process": "error",
    },
  },
];
