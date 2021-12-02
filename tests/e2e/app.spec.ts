import { debug } from 'console';
import { config } from '../../webdriverio/local.conf';
import { Page } from './po/Page.po';
import { ToggleView } from './po/ToggleView.po';

describe('App component', () => {
  let page: Page;
  let toggleObj: ToggleView;
  const views: string[] = ['list', 'thumb', 'table'];
  const baseUrl!: string = config.baseUrl ? config.baseUrl : '';

  before(async () => {
    page = new Page();
    toggleObj = new ToggleView();
  });

  beforeEach(async () => {
    await page.navigateTo('channels/');
  });

  it('should lauch', async () => {
    const appTitle = await page.getAppTitle(),
          pageTitle = await page.getNavigationTitle();
    expect(appTitle).toBe('Channels Navigation');
    expect(pageTitle).toBe('Racine');
  });

  it('should load root channels on first page', async () => {
    const channelsCountPerPage: number = 12,
      channelsItems = await page.getItems();
    expect(channelsItems.length).toEqual(channelsCountPerPage);
  });

  it('should change view on toggle buttons click', async () => {
    for (const view of views) {
      await toggleObj.clickOnToggleViewButton(view);
      await toggleObj.isCurrentView(view);
    }
  });

  it('should navigate to the right channel on item click', async () => {
    const items = await page.getItems({channel: true})
    const itemExample = items[Math.floor(Math.random() * items.length)]
    const itemUrl = baseUrl + await itemExample.$('a').getAttribute('href')

    itemExample.click();
    await browser.waitUntil(
      async () => {
        const pageUrl = await browser.getUrl()
        return pageUrl === itemUrl
      },
      { timeout: 5000, timeoutMsg: 'Expected url browser to match item route' }
    );
    const pageUrl = await browser.getUrl();
    expect(pageUrl).toBe(itemUrl);
  });

  it('should navigate and keep the selected view', async () => {
    const viewExample = 'table';
    await toggleObj.clickOnToggleViewButton(viewExample);

    const items = await page.getItems({tableView: true, channel: true});
    const itemExample = items[Math.floor(Math.random() * items.length)]
    itemExample.click();
    await new Promise(r => setTimeout(r, 1000))
    expect(await toggleObj.isCurrentView(viewExample)).toBeTruthy()
  });
});