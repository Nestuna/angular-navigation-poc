
// ./webdriverio/local.conf.ts

import { RemoteOptions } from "webdriverio";

export const config: RemoteOptions = {
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