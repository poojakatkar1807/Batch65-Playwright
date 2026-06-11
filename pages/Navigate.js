
export class Navigate{

   constructor(page){
          this.page = page;
          this.abc = page.locator("h2", {hasText: "Form Submission"});
        
    }

    async openApp(){
        //await this.page.goto('https://www.saucedemo.com/');
        await this.page.goto('file:///C:/Users/SARANG/OneDrive/Documents/GitHub/Automation-%20EHR/automation-practice-master/app/index.html')
    }
    async clickOnForm(){
        await this.abc.click();
    }
}