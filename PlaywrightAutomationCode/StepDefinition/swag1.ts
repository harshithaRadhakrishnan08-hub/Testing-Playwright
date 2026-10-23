import { Given, When, Then } from '@cucumber/cucumber'

import { expect } from '@playwright/test'

import userArray from '../TestData/SwagData.json'

import { pageFixture } from '../hooks/pageFixture'

let errorUsers: string[] = []

When('Launch the Swag broswer for testing', async function () {
    await pageFixture.page.goto("https://www.saucedemo.com/")
});

Then('Enter Username and password', async function () {
    console.log("***Enter Username using locators******")
    await pageFixture.page.getByPlaceholder("Username").fill("standard_user")
    // await page.waitForTimeout(5000)

    console.log("***Enter password using locator****")
    await pageFixture.page.getByPlaceholder("password").fill("secret_sauce")
    // await page.waitForTimeout(5000)

    console.log("***Click the button*****")
    //await page.getByTestId("login-button").click()

    await pageFixture.page.getByRole('button', { name: 'Login' }).click()
    // await page.waitForTimeout(5000)

    await pageFixture.page.getByAltText("Sauce Labs Backpack").click()
    //  await page.waitForTimeout(5000)

    await pageFixture.page.getByRole('button', { name: 'Back to products' }).click()
    // await page.waitForTimeout(5000) 

    await pageFixture.page.getByAltText('Test.allTheThings() T-Shirt (Red)').scrollIntoViewIfNeeded()
    // await page.waitForTimeout(5000)

    await pageFixture.page.getByAltText('Test.allTheThings() T-Shirt (Red)').click()
    // await page.waitForTimeout(5000)

    await pageFixture.page.getByRole('button', { name: 'Add to cart' }).click()
    // await page.waitForTimeout(5000)

    await pageFixture.page.getByRole('button', { name: 'Cart, 1 items' }).click()
    await pageFixture.page.waitForTimeout(5000)

    await pageFixture.page.getByRole('button', { name: 'Checkout' }).click()
    await pageFixture.page.waitForTimeout(5000)

    await pageFixture.page.locator('//*[@id="first-name"]').fill("Harshitha") //using relative xpath
    await pageFixture.page.locator('[id="last-name"]').fill("Radhakrishnan") // using css attribute name=value
    await pageFixture.page.locator('#postal-code').fill('53142') // using css class id 
    await pageFixture.page.waitForTimeout(5000)

    await pageFixture.page.locator('#continue').click()
    await pageFixture.page.waitForTimeout(5000)

    await pageFixture.page.getByRole('button', { name: 'Finish' }).click()
    await pageFixture.page.waitForTimeout(5000)

    await pageFixture.page.locator('[id="generate-pdf-order"]').click()
    await pageFixture.page.waitForTimeout(5000)
});

Then('I login with valid credentials1', async function () {
    let users: any[] = Object.values(userArray)
    for (const user of users) {
        await pageFixture.page.locator('#user-name').fill(user.username)
        await pageFixture.page.waitForTimeout(2000)

        await pageFixture.page.locator('#password').fill(user.password)
        await pageFixture.page.waitForTimeout(2000)

        await pageFixture.page.locator('#login-button').click()
        await pageFixture.page.waitForTimeout(2000)

        let errorLocator = pageFixture.page.locator('.error-message-container')
        let errorvisible = await errorLocator.isVisible()
        if (errorvisible) {
            let errorMessage = await errorLocator.textContent()
            errorUsers.push(user.username)
            console.log(`Error message for ${user.username} is : ${errorMessage}`)
        }
        else {
            await pageFixture.page.locator('#react-burger-menu-btn').click()
            await expect(pageFixture.page.locator('#logout_sidebar_link')).toBeVisible()
            await pageFixture.page.locator('#logout_sidebar_link').click()
            await pageFixture.page.waitForTimeout(2000)
        }
    }

})  
