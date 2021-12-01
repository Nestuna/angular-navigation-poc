
// ./webdriverio/local.conf.ts

module.exports = {
  capabilities: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: [
        '--no-sandbox',
        '--window-size=1420,1080',
        '--headless',
        '--disable-gpu',
      ]
    }
  },
  waitforTimeout: 15000,
  baseUrl: 'http://localhost:4200',
  logLevel: 'error'

};