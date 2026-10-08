import { Given, setDefaultTimeout, Then } from '@cucumber/cucumber'

// Import Browser and Page for Playwright automation
import { Browser, chromium, Page } from 'playwright/test'

//create objects for Browser and Page interfaces  
// Broswer - any broswer such as chromium, firefox and webkit 
// Context - one session on the window 
// Page - one tab on the window
let browser: Browser, page: Page

let context

setDefaultTimeout(60 * 1000)

Given('Launch the browser', async function () {
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    })

    context=await browser.newContext({
        viewport:null
    })

    page=await context.newPage()
    await page.waitForTimeout(3000)    
} ) 

Then('Close the broswer',async function(){
    await browser.close()
})
