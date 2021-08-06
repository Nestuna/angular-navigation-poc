export class AppPage {
	async navigateTo (loginPage?) {
    	return await browser.url('/');
  	}
  	async getTitle () {
  		return await $('app-root h1').getText();
  	}
}