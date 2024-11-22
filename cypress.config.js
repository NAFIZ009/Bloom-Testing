const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://bloom.labthree.org',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  // Configure Chrome to show browser
  video: false, // Disable video recording for faster tests
  screenshotOnRunFailure: true,
  chromeWebSecurity: false, // Disable web security for testing
});
