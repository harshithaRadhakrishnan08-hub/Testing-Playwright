import { Given, When, Then } from '@cucumber/cucumber'

import { Browser, chromium, Page } from '@playwright/test'

let browser: Browser, page: Page

let context

Given('Launch the Browser', async function () {
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    })

    context = await browser.newContext({
        viewport: null,
        ignoreHTTPSErrors: true
    })

    page = await context.newPage()

});
/*
When('Launch the test automation practice', async function () {
    await page.goto("https://testautomationpractice.blogspot.com/")
});*/

When('Open the page',async function(){
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
})

Then('Fill the data form', async function () {
    console.log("*************LOCATORS PRACTICE**************")
    await page.getByPlaceholder("Enter Name").fill("Harshitha")
    await page.waitForTimeout(3000)

    await page.getByPlaceholder("Enter EMail").fill("harshi.krishnan8@gmail.com")
    await page.waitForTimeout(3000)

    //await page.getByLabel("Phone:").fill('2622715236')
    await page.getByPlaceholder("Enter Phone").fill("2622715236")
    await page.waitForTimeout(3000)

    await page.getByLabel("Address:").fill("262 springdale Avenue,Waukesha")
    await page.waitForTimeout(3000)

    await page.getByRole('radio', { name: 'Female' }).click()
    await page.waitForTimeout(3000)

    await page.getByRole('checkbox',{name:'Monday'}).click()
    await page.getByRole('checkbox',{name:'Tuesday'}).click()
    await page.getByRole('checkbox',{name:'Wednesday'}).click()
    await page.getByRole('checkbox',{name:'Thursday'}).click()
    await page.waitForTimeout(3000)

    await page.getByRole('button',{name:'START'}).click()
    await page.waitForTimeout(3000)

    await page.getByText('STOP').click()
    await page.waitForTimeout(3000)

    await page.getByRole('button',{name:'Confirmation Alert'}).click()

});


Then('practice locators',async function(){
    // await page.getByLabel('Radio1').click()
    //await page.getByRole('radio',{name:'Radio1'}).click()
    //await page.getByText('Radio1').click()
    await page.locator('//*[@id="radio-btn-example"]/fieldset/label[1]/input').click() 
    await page.waitForTimeout(5000)

    await page.getByPlaceholder('Type to Select Countries').fill('United States')
    await page.waitForTimeout(5000)

    // await page.getByRole('checkbox',{name:'Option1'}).click()
    // await page.getByRole('checkbox',{name:'Option2'}).click()
    // await page.getByRole('checkbox',{name:'Option3'}).click()
    await page.locator('//*[@id="checkBoxOption1"]').click()
    // await page.locator('//*[@id="checkbox-example"]/fieldset/label[1]').click()
    await page.locator('//*[@id="checkBoxOption2"]').click()
    await page.locator('//*[@id="checkBoxOption3"]').click()
    
    await page.waitForTimeout(5000)

    //await page.locator('[id="openwindow"]').click() // css att=value
  /*  await page.getByRole('button',{name:'Open Window'}).click()
    await page.locator('//*[@id="opentab"]').click() // relative xpath
    await page.waitForTimeout(3000)*/

    await page.getByPlaceholder('Enter Your Name').fill('Harshitha')
    await page.waitForTimeout(5000)
    const alertBtn = page.getByRole('button',{name:'Alert'})
    await alertBtn.hover();
    await alertBtn.click();
    await page.waitForTimeout(5000)
    await page.locator('#confirmbtn').click()
    await page.waitForTimeout(5000)
})

Then('Close the app', async function () {
    await page.close()
});