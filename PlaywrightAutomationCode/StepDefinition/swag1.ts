import {Given,When,Then} from '@cucumber/cucumber'

import {Browser,chromium,Page,expect} from '@playwright/test'

import userArray from '../TestData/SwagData.json'

let broswer:Browser,page:Page

let context

let errorUsers:string[]=[]

When('I launch the browser', async function () {
    broswer = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    })

    context = await broswer.newContext({
        viewport: null
    })

    page = await context.newPage()
});

Then('Enter Username and password', async function () {
    console.log("***Enter Username using locators******")
    await page.getByPlaceholder("Username").fill("standard_user")
    // await page.waitForTimeout(5000)

    console.log("***Enter password using locator****")
    await page.getByPlaceholder("password").fill("secret_sauce")
    // await page.waitForTimeout(5000)

    console.log("***Click the button*****")
    //await page.getByTestId("login-button").click()

    await page.getByRole('button', { name: 'Login' }).click()
    // await page.waitForTimeout(5000)

    await page.getByAltText("Sauce Labs Backpack").click()
    //  await page.waitForTimeout(5000)

    await page.getByRole('button',{name:'Back to products'}).click()
    // await page.waitForTimeout(5000) 

    await page.getByAltText('Test.allTheThings() T-Shirt (Red)').scrollIntoViewIfNeeded()
    // await page.waitForTimeout(5000)

    await page.getByAltText('Test.allTheThings() T-Shirt (Red)').click()
    // await page.waitForTimeout(5000)

    page.getByRole('button',{name:'Add to cart'}).click()
    // await page.waitForTimeout(5000)

    await page.getByRole('button',{name:'Cart, 1 items'}).click()
    await page.waitForTimeout(5000)

    await page.getByRole('button',{name:'Checkout'}).click()
    await page.waitForTimeout(5000)

    await page.locator('//*[@id="first-name"]').fill("Harshitha") //using relative xpath
    await page.locator('[id="last-name"]').fill("Radhakrishnan") // using css attribute name=value
    await page.locator('#postal-code').fill('53142') // using css class id 
    await page.waitForTimeout(5000)

    await page.locator('#continue').click()
    await page.waitForTimeout(5000)

    await page.getByRole('button',{name:'Finish'}).click()
     await page.waitForTimeout(5000)

    await page.locator('[id="generate-pdf-order"]').click() 
    await page.waitForTimeout(5000)
});

Then('I login with valid credentials1',async function(){
    let users: any[]=Object.values(userArray)
    for(const user of users){
    await page.locator('#user-name').fill(user.username)
    await page.waitForTimeout(2000)

    await page.locator('#password').fill(user.password)
    await page.waitForTimeout(2000)

    await page.locator('#login-button').click()
    await page.waitForTimeout(2000)
    
    let errorLocator=page.locator('.error-message-container')
    let errorvisible=await errorLocator.isVisible() 
    if(errorvisible){
        let errorMessage=await errorLocator.textContent()
        errorUsers.push(user.username)
        console.log(`Error message for ${user.username} is : ${errorMessage}`)
    }
    else{
        await page.locator('#react-burger-menu-btn').click()
        await expect(page.locator('#logout_sidebar_link')).toBeVisible()
        await page.locator('#logout_sidebar_link').click()
        await page.waitForTimeout(2000)        
    }
}

})  
