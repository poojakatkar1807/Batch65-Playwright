import { test, expect } from '@playwright/test';
//import users from '../data/users.json' with {type : "json"}
import users from '../data/testdata.json' with {type : "json"}
import { LoginPage } from '../pages/LoginPage.js';
import { Navigate } from '../pages/Navigate.js';

//console.log(users);
// normal for loop for iteration
// for (let i=0 ; i<users.length ; i++ )
//   const user = users[i]

// for each or for of loop

for (const user of users ){
test(`test ${user.scenario}`, async ({ page }) => {
  let login = new LoginPage(page);
  let nav = new Navigate(page);

  await nav.openApp();
  await login.enterUsername(user.username);
  await login.enterPassword(user.password);
  await login.clickOnSignon();
  await expect(login.errMsg).toHaveText(user.errMsg);
  
  //await page.locator('[data-test="login-button"]').click();

  // assert element in playwright 
  //await expect(page).toHaveTitle("Swag Labs");
  //await expect(page.locator("//h3[@data-test='error']")).toHaveText(user.errMsg)
  //await expect(page.locator("//*[@id='login-button']")).toBeVisible()
});
}




// TDD driven approch
// go to package.json file add or change type as module 
// add users.json 
// import users into file
// for loop and use every index 