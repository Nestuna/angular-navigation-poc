import { AppPage } from './po/app.po';

describe('App component', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
  });
  it('should be loaded', async () => {
    expect(await page.getTitle()).toContain('boilerplate-angular app is running!');
  });
});