import {Given,When,Then} from '@cucumber/cucumber'

import {Browser,chromium,Page,expect} from '@playwright/test'

import userArray from '../TestData/SwagData.json'

let broswer:Browser,page1:Page,page2:Page

let context

let userDetails ={username:'standard_user',password:'secret_sauce'}

let userOrderDetails={username:'Shanvika',lastname:'Jaganathan',zip:'53142'}

When('I launch the browser for multiple pages', async function () {
    broswer = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    })

    context = await broswer.newContext({
        viewport: null
    })

    page1 = await context.newPage()
    page2 = await context.newPage()
});

When('Launch the Swag broswer', async function () {
    await page1.goto("https://www.saucedemo.com/")
    await page2.goto("https://www.saucedemo.com/")
});

Then('I login with valid credentials',async function(){
    await page1.bringToFront()
    await page1.waitForTimeout(2000)

    await expect(page1.locator('#user-name')).toBeVisible()
    await page1.locator('#user-name').fill(userDetails.username)
    await page1.waitForTimeout(2000)
    
    await expect(page1.locator('#password')).toBeVisible()
    await page1.locator('#password').fill(userDetails.password)
    await page1.waitForTimeout(2000)
    
    await expect(page1.locator('#login-button')).toBeVisible()
    await page1.locator('#login-button').click()
    await page1.waitForTimeout(2000)

    const errorContainer = page1.locator('.error-message-container error')
    const visibleError = await errorContainer.isVisible() 
    if(visibleError){
      const errorMessage = await errorContainer.textContent()
      console.log(`Login failed for user ${userDetails.username} with error: ${errorMessage}`)
    }
    else{
        console.log(`Login succesful for user ${userDetails.username}`)
        await expect(page1).toHaveURL('https://www.saucedemo.com/inventory.html')
    }
    await page2.bringToFront()
    await page2.goto('https://www.saucedemo.com/inventory.html')
    await page1.waitForTimeout(2000)

    await page1.bringToFront()
    await page1.waitForTimeout(2000)

    // add items in cart 
    await expect(page1).toHaveURL('https://www.saucedemo.com/inventory.html')
    const prodCount =await page1.locator('//div[@class="inventory_item"]').filter({hasText:'Sauce Labs'}).getByRole('button',{name:'Add to cart'})
    for(let i=0;i<await prodCount.count();i++){
        await prodCount.nth(i).click()
        await page1.waitForTimeout(1000)
    }

    //switch to page2 to verify 
    await page2.bringToFront()
    await page1.waitForTimeout(2000)

    await page2.locator('.shopping_cart_link').click()
    await page1.waitForTimeout(2000)

    const productname=await page2.locator('.inventory_item_name').allInnerTexts()
    console.log('The products ordered ',productname)

    await page2.getByRole('button',{name:'Checkout'}).click()
    await page1.waitForTimeout(2000)

    await expect(page2).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')

    await page2.locator('#first-name').fill(userOrderDetails.username)
    await page2.locator('#last-name').fill(userOrderDetails.lastname)
    await page2.locator('#postal-code').fill(userOrderDetails.zip)
    await page2.locator('#continue').click()
    await page1.waitForTimeout(2000)

    await expect(page2).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
   
    await page2.locator('#finish').click()
    await page1.waitForTimeout(2000)
    
    await expect(page2).toHaveURL('https://saucedemo.com');
    console.log('Checkout completed successfully on page2!');
})

Then('Close the browser', async function () {
    await page1.close()
    await page2.close()
     await broswer.close();
});