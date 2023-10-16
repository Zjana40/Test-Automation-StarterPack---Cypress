const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    openMode: 1,
    runMode: 1,
  },
  e2e: {
    baseUrl : "https://kiwi.com/en",
    viewportWidth: 1600,
    viewportHeight: 1200,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
