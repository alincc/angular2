export class HomePage {

  public listPracticeBtn = element(by.css('.go-to-signup')); 
  public signupListPlanBtn = element(by.id('list-plan-btn')); 
  public signupConsultPlanBtn = element(by.id('list-consult-plan-btn')); 
  public signupFrontdeskPlanBtn = element(by.id('frontdesk-plan-btn')); 
  public signupInventoryPlanBtn = element(by.id('inventory-plan-btn')); 
  public logoBtn = element(by.css('.home-url'));

  navigateTo() {
    return browser.get('/');
  }

  clickLogo(){
    browser.get('signup');
    this.logoBtn.click();
  }

  getParagraphText() {
    return element(by.css('app h1')).getText();
  }

  listPractice(){
  	this.listPracticeBtn.click();
  }

  signUpFromListPlan(){
    this.signupListPlanBtn.click();
  }

  signUpFromConsultPlan(){
    this.signupConsultPlanBtn.click();
  }

  signUpFromFrontdeskPlan(){
    this.signupFrontdeskPlanBtn.click();
  }

  signUpFromInventoryPlan(){
    this.signupInventoryPlanBtn.click();
  }


}
