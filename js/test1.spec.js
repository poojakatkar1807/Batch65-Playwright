
import{test} from "@playwright/test"

test ('My First Test', (async({page})=>{
    await page.goto("http://localhost:3000/")
 
}));