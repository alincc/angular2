import { HomePage } from './home.po';

describe('HomePage App', function() {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display message saying Your Health Care Practice. Online', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Your Health Care Practice. Online');
  });

  it('Should go back to home page upon logo click', () => {
    page.clickLogo();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
  });

  it('List your practice button should navigate to signup', () => {
    page.listPractice();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'signup');
  });

  it('Signup from listing plan  should navigate to signup', () => {
    page.signUpFromListPlan();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'signup');
  });

  it('Signup from consult plan should navigate to signup', () => {
    page.signUpFromConsultPlan();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'signup');
  });

  it('Signup from frondesk plan should navigate to signup', () => {
    page.signUpFromFrontdeskPlan();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'signup');
  });

  it('Signup from Inventory plan a should navigate to signup', () => {
    page.signUpFromInventoryPlan();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'signup');
  });

});
