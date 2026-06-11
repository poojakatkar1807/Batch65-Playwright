import { test, expect } from '@playwright/test';
import { Navigate } from '../pages/Navigate.js';
import { beforeEach } from 'node:test';

test.beforeEach(async({page})=>{
    let nav = new Navigate(page);
    await nav.openApp()
    await nav.clickOnForm();
})
test('verify form submission element @screen1 @smoke', async({page}) =>{

    await expect(page).toHaveTitle("Form Submission Practice");
    await expect(page.locator("h1")).toContainText("Form Submission Practice")
    
})

test('verify form data submission')