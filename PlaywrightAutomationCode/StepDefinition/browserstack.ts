import {Given, When, Then} from '@cucumber/cucumber'

import { Browser, BrowserContext, Page, chromium , expect } from '@playwright/test'

let browser:Browser, page:Page , page1:Page 
let context:BrowserContext
let pageUrl:string

Given('Open the Browser for testing',async function(){
    browser=await chromium.launch({
        headless:false,
        args:['--start-maximized']
    })

    context=await browser.newContext({
        viewport:null
    })

    page=await context.newPage()
});

When('Open the Browser Stack webpage',async function(){
    await page.goto('https://www.bstackdemo.com/')
});

Then('Get the product list',async function(){
    await page.locator('//span[text()="Samsung"]').click()
    await page.waitForTimeout(3000)

    await page.locator('//div[@class="sort"]//child::select').selectOption('Lowest to highest')
    await page.waitForTimeout(3000)

    const itemLocator=await page.locator('.shelf-item').all()
    const itemCount=itemLocator.length
    console.log('*******************************************')
    console.log('The number of the prducts ', itemCount)

    const lowestPrice=await itemLocator[0].locator('//div[@class="shelf-item__price"]//child::div[@class="val"]').innerText()
    const highestPrice=await itemLocator[itemCount-1].locator('//div[@class="shelf-item__price"]//child::div[@class="val"]').innerText()
    
    console.log('The lowest price ',lowestPrice)
    console.log('The highest price',highestPrice)
    console.log('*******************************************')

    //assertion check - remove $ symbol and convert the string to number before comparing
    await expect(Number(lowestPrice.slice(2,lowestPrice.length))).toBeLessThanOrEqual(Number(highestPrice.slice(2,highestPrice.length)))

});
Then('Check the invalid configuration',async function () {
    await page.getByText('Sign In').click()
    await page.waitForTimeout(3000)

    await page.locator('#username').click()
    await page.waitForTimeout(3000)

    await page.locator('//div[text()="locked_user"]').click()
    await page.waitForTimeout(3000)

    await page.locator('#password').click()
    await page.waitForTimeout(3000)

    await page.locator('//div[text()="testingisfun99"]').click()
    await page.waitForTimeout(3000)

    await page.getByRole('button',{name:'Log In'}).click()
    await page.waitForTimeout(3000)

    const error=await page.locator('//div[@id="password"]//following-sibling::h3').isVisible()
    var errorMesssage=""
    if(error){
        errorMesssage=await page.locator('//div[@id="password"]//following-sibling::h3').innerText()
    }
    console.log('The error message is: ',errorMesssage)
})

Then('Refresh and enter the valid login details',async function(){
    await page.reload()
    await page.waitForTimeout(3000)

    await page.locator('#username').click()
    await page.waitForTimeout(3000)

    await page.locator('//div[text()="fav_user"]').click()
    await page.waitForTimeout(3000)

    await page.locator('#password').click()
    await page.waitForTimeout(3000)

    await page.locator('//div[text()="testingisfun99"]').click()
    await page.waitForTimeout(3000)

    await page.getByRole('button',{name:'Log In'}).click()
    await page.waitForTimeout(3000)

    //assertion check 
    await expect(page).toHaveURL('https://www.bstackdemo.com/?signin=true')
})

Then('Login as {string}',async function(user:string){

    await page.bringToFront()

    await page.getByText('Sign In').click()
    await page.waitForTimeout(2000)

    await page.locator('#username').click()
    await page.waitForTimeout(2000)

    await page.locator(`//div[text()="${user}"]`).click()
    await page.waitForTimeout(2000)

    await page.locator('#password').click()
    await page.waitForTimeout(2000)

    await page.locator('//div[text()="testingisfun99"]').click()
    await page.waitForTimeout(2000)

    await page.getByRole('button',{name:'Log In'}).click()
    await page.waitForTimeout(2000)

})

Then('Add an item {string} to cart',async function(product:string){
    await page.locator('.shelf-item').filter({
        has:page.locator('.shelf-item__title').getByText('iPhone 12', { exact: true })
    }).locator('.shelf-item__buy-btn').click()
    await page.waitForTimeout(3000)

    await expect(page.locator('//div[@class="float-cart float-cart--open"]')).toBeVisible()
    await page.waitForTimeout(3000)

    await page.getByText('Checkout').click()
    await page.waitForTimeout(3000)

    await expect(page).toHaveURL('https://www.bstackdemo.com/checkout')
    await page.waitForTimeout(3000)

    pageUrl=await page.url()
})

Then('Enter the Order details {string},{string},{string},{string},{string}',async function(FirstName:string,SecName:string,Address:string,State:string,PostalCode:string){
    await page.locator('#firstNameInput').fill(FirstName)
    await page.locator('#lastNameInput').fill(SecName)
    await page.locator('#addressLine1Input').fill(Address)
    await page.locator('#provinceInput').fill(State)
    await page.locator('#postCodeInput').fill(PostalCode)
    await page.waitForTimeout(3000)
    await page.getByRole('button',{name:'Submit'}).click()
    await page.waitForTimeout(3000)

    await expect(page).toHaveURL('https://www.bstackdemo.com/confirmation')

    await page.getByText('Download order receipt').click()
    await page.waitForTimeout(3000)

})

Then('create another page2 and open the homepage {string}',async function(url:string){
    page1= await context.newPage()

    await page1.goto(url)
    await page1.bringToFront()

})

Then('Switch to page2 and verify wehther the item is added to the cart',async function(){
    await page1.bringToFront()
    await page1.waitForTimeout(2000)
 
    await page1.goto(pageUrl)
    await page1.waitForTimeout(2000)

})

Then('Close the testing browser', async function() {
    await browser.close()   
});

