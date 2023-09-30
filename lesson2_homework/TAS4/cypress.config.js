const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    openMode: 1,
    runMode: 2,
  },
  e2e: {
    baseUrl : "https://furbo.sk/waw",
    viewportWidth: 1600,
    viewportHeight: 1200,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
