import { Given,When,Then} from '@cucumber/cucumber'

import { Browser, BrowserContext, Page, chromium, expect } from '@playwright/test'

import {UserDetails} from '../TestData/UserData.json'

let page1:Page, page2:Page,browser:Browser,totalPages:Page[]

let context1: BrowserContext

Given('Open the Browser with more pages',async function(){
    browser=await chromium.launch({
        headless:false,
        args:["--start-maximized"]
    })

    context1=await browser.newContext({
        viewport:null
    })

    page1=await context1.newPage()
    page2=await context1.newPage()
    totalPages=await context1.pages()
    console.log('The total pages ',totalPages.length)
})

Then('I open browser stack page',async function(){
    await page1.goto('https://www.bstackdemo.com/signin?offers=true')    
    await page2.goto('https://www.bstackdemo.com/')
})

Then('I practice Windows Handling',async function(){
    // open the new page1
    await totalPages[0].bringToFront()
    await page1.locator('//div[@class=" css-1hwfws3"]//div[text()="Select Username"]').click()
    await page1.waitForTimeout(2000)
    await page1.locator('//div[@id="username"]//descendant::div[text()="demouser"]').click()
    await page1.waitForTimeout(2000)

    // await page1.waitForSelector('//div[@class=" css-1hwfws3"]//div[text()="Select Password"]')
    await page1.locator('//div[@class=" css-1hwfws3"]//div[text()="Select Password"]').click()
    await page1.waitForTimeout(2000)
    await page1.locator('//div[@id="password"]//descendant::div[text()="testingisfun99"]').click()
    await page1.waitForTimeout(2000)

    await page1.getByRole('button',{name:'Log In'}).click()
    await page1.waitForTimeout(2000)

    await page1.locator('//img[@class="Navbar_logo__image__3Blki"]').click()

    await page1.locator('.shelf-item').filter({ hasText: 'iPhone 12' }).locator('.shelf-item__buy-btn').first().click();
    await page1.waitForTimeout(2000)

    // await expect(page1.locator('.float-cart float-cart--open')).toBeVisible()
    
    const totalOrder=await page1.locator('//div[@class="float-cart float-cart--open"]//descendant::span[@class="bag__quantity"]').innerText()
    console.log("The total amount of items added ",totalOrder)

    await page1.locator('//div[@class="buy-btn"]').click()
    await page1.waitForTimeout(2000)

    await page1.waitForLoadState()
    const newlink = await page1.url()
    console.log('The new navigated page URL ',newlink)

    // switch to other page
    await page2.bringToFront()
    const totalOrder1=await page2.locator('//span[@class="bag bag--float-cart-closed"]//child::span[@class="bag__quantity"]').innerText()
    console.log('The total order in page 2 is ',totalOrder1)

    //switch to 1st page again to enter order details 
    await page1.bringToFront()
    await page1.locator('#firstNameInput').fill(UserDetails.Firstname)
    await page1.locator('#lastNameInput').fill(UserDetails.Secondname)
    await page1.locator('#addressLine1Input').fill(UserDetails.Address)
    await page1.locator('#provinceInput').fill(UserDetails.State)
    await page1.locator('#postCodeInput').fill(UserDetails.PostalCode)
    await page1.waitForTimeout(2000)

    await page1.getByRole('button',{name:'Submit'}).click()
    await page1.waitForTimeout(2000)
    
    // Click the orders of page1 in new tab 
    // continue shopping 
    await totalPages[0].getByRole('button',{name:'Continue Shopping »'}).click()
    await totalPages[0].waitForTimeout(2000)

    //create new Page in context 
    const newPagePromise =context1.waitForEvent('page') 
    await totalPages[0].locator('#orders').click({modifiers:['ControlOrMeta']})
    await totalPages[0].waitForTimeout(2000)

    const newPage=await newPagePromise
    await newPage.waitForLoadState();
    totalPages=context1.pages()
    console.log('TotalPages',totalPages.length)
    await totalPages[2].bringToFront()
    await totalPages[2].waitForTimeout(2000)    
    
})

Then('Close the pages, context and browser',async function(){ 
    await context1.close()
    await browser.close()
})

