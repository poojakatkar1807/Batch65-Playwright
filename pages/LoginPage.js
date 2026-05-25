
export class LoginPage{

    constructor(page){
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginbtn = page.locator('[data-test="login-button"]');
        this.errMsg = page.locator("//h3[@data-test='error']");

    }

   async enterUsername(username){
        await this.username.click();
        await this.username.click();
        await this.username.fill(username);
    }
   async enterPassword(password){
       await this.password.click();
       await this.password.fill(password);
    }
    clickOnSignon(){
        this.loginbtn.click();
    }
}