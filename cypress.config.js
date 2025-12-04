const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents() {
    },
    specPattern: "cypress/e2e/**/*.cy.{js,ts}", 
    excludeSpecPattern: [
      "cypress/e2e/2-advanced-examples/**/*.cy.{js,ts}", 
      "cypress/fixtures/**/*.js", 
      "cypress/support/**/*.js" 
    ],
  },
});
