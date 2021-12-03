import { Element, ElementArray } from 'webdriverio';

export class Page {

  async navigateTo(route?: string): Promise<void> {
    if (!route) route = '/';
    await browser.url(route);
  }

  async getAppTitle(): Promise<string> {
    return await browser.getTitle();
  }

  async getNavigationTitle(): Promise<string> {
    const elt = await this.getNavigationTitleElement();
    return await elt.getText();
  }
  async getNavigationTitleElement(): Promise<Element<'async'>> {
    return await browser.$('#nav-header .title-container');
  }

  async getItemTitleElement(): Promise<Element<'async'>> {
    return await browser.$('.item-title');
  }

  async getItems(options?: { tableView?: boolean, channel?: boolean }): Promise<ElementArray> {
    let selector = '<app-item>'
    if (options?.tableView) {
      selector = '.table-item'
    }
    if (options?.channel) {
      selector = '.channel-item'
    }

    const channelItem = await browser.$(selector);
    await channelItem.waitForExist({
      timeout: 5000,
      timeoutMsg: 'item not found',
    });
    return await browser.$$(selector);
  }
}
