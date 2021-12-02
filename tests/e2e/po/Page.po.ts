import { Browser, Element, ElementArray } from 'webdriverio';

export class Page {
  browser!: Browser<'async'>;

  constructor(browser: Browser<'async'>) {
    this.browser = browser;
  }

  async navigateTo(route?: string): Promise<void> {
    if (!route) route = '/';
    await this.browser.url(route);
  }

  async getAppTitle(): Promise<string> {
    return await this.browser.$('<title>').getText();
  }

  async getNavigationTitle(): Promise<string> {
    const elt = await this.getNavigationTitleElement();
    return await elt.getText();
  }
  async getNavigationTitleElement(): Promise<Element<'async'>> {
    return await this.browser.$('#nav-header .title-container');
  }

  async getItemTitleElement(): Promise<Element<'async'>> {
    return await this.browser.$('.item-title');
  }

  async getItems(options?: { tableView?: boolean, channel?: boolean }): Promise<ElementArray> {
    let selector = '<app-item>'
    if (options?.tableView) {
      selector = '.table-item'
    }
    if (options?.channel) {
      selector = '.channel-item'
    }

    const channelItem = await this.browser.$(selector);
    await channelItem.waitForExist({
      timeout: 5000,
      timeoutMsg: 'item not found',
    });
    return await this.browser.$$(selector);
  }
}
