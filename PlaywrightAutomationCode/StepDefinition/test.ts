// Import Gherkin keyword from cuccumber
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

Given('I launch the Browser', async function () {
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    })

    context = await browser.newContext({
        viewport: null
    })

    page = await context.newPage()
});

Then('I launch the facebook Application', async function () {

    await page.goto("https://www.facebook.com/", { timeout: 6000 })

});

Then('I close the browser', async function () {
    
    await page.close()

});