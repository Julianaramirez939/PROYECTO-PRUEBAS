const js = require("@eslint/js");
const security = require("eslint-plugin-security");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2020,
      globals: {
        // Node
        console: "readonly",
        module: "readonly",
        require: "readonly",
        process: "readonly",

        // Browser
        document: "readonly",
        window: "readonly",

        // Jest
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        jest: "readonly",

        // Cypress
        cy: "readonly",
        Cypress: "readonly",
      },
    },

    plugins: {
      security,
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
