import { Browser } from 'webdriverio';

export class ToggleView {
  browser!: Browser<'async'>;

  constructor(browser: Browser<'async'>) {
    this.browser = browser;
  }

  async clickOnToggleViewButton(view: string): Promise<void> {
    const button = await this.browser.$(`.${view}-button`);
    button.click();
  }

  async isCurrentView(view: string): Promise<boolean> {
    let isCurrentView: boolean | void;
    if(view === 'table') {
      isCurrentView = await this.browser
        .$('.table-container')
        .waitForExist()
    } else {
      await this.browser.$('<app-item>').waitForExist()
      isCurrentView = await this.browser.$(`<app-${view}-item>`).waitForExist()
    }
    return isCurrentView ? true : false
  }
}