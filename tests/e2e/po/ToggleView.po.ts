
export class ToggleView {

  async clickOnToggleViewButton(view: string): Promise<void> {
    const button = await browser.$(`.${view}-button`);
    button.click();
  }

  async isCurrentView(view: string): Promise<boolean> {
    let isCurrentView: boolean | void;
    if(view === 'table') {
      isCurrentView = await browser
        .$('.table-container')
        .waitForExist()
    } else {
      await browser.$('<app-item>').waitForExist()
      isCurrentView = await browser.$(`<app-${view}-item>`).waitForExist()
    }
    return isCurrentView ? true : false
  }
}