import { Page, expect } from '@playwright/test'

import { userDetails } from '../TestData/swagUserLogin.json'


export class SwagLoginPage {
    loginsuccess: boolean = true

    constructor(public page: Page) {
        this.page = page
    }

    private loginElements = {
        usernameId: "#user-name",
        userPasswordId: "#password",
        loginButtonId: "#login-button"
    }

    async verifyWebelementsInLoginPage() {
        await expect(this.page.locator(this.loginElements.usernameId)).toBeVisible()
        await expect(this.page.locator(this.loginElements.userPasswordId)).toBeVisible()
        await this.page.locator(this.loginElements.loginButtonId).waitFor({ state: 'visible', timeout: 5000 });
        this.loginsuccess = await this.page.locator(this.loginElements.loginButtonId).isVisible()
    }

    async locateElementsInLoginPage() {
          
        await this.page.locator(this.loginElements.usernameId).fill(userDetails.username)
        await this.page.locator(this.loginElements.userPasswordId).fill(userDetails.password)
        if (this.loginsuccess==true) {
            await this.page.locator(this.loginElements.loginButtonId).click()
            await this.page.waitForTimeout(2000)
            console.log(`The Login for ${userDetails.username} is success`)
        }
        else {
            console.log(`The login for ${userDetails.username} is not success`)
        }
    }
}