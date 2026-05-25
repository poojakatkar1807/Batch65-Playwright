import { test, expect } from '@playwright/test';

test ('test1', async({browser, context, page})=> {
    // every browser will have own context 
    //let context1 = await browser.newContext();
    //let page1 = await context.newPage();
    await page.goto('https://www.myntra.com');


    //let context2 = await browser.newContext();
    // let page2 = await context.newPage();
    // await page2.goto('https://www.amazon.in')
})

// browser - chrome firefox webkit instance 
// context - incognito type isolated cookies free session 
// page - tabs / windows 

// fixture - predefined objects in playwright 
// browser - gives us browser services 
// context - browser window - 5 windows 
// page = browser tab 
