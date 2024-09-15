const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,   // Enable HTML report generation
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-image-diff-js/plugin')(on,config)
      require('cypress-mochawesome-reporter/plugin')(on)

    }
  },
  retries:2,
  video:true,
  screenshotOnRunFailure:true
})
