import { Page , expect } from "@playwright/test"

export class EventLoginPage{
  
    constructor(public page:Page){
        this.page=page
    }

    private loginElements={
        emailId:'#email',
        passwordId:'#password',
        submitId:'#login-btn'
    }

    async waitPage(){
        await this.page.waitForLoadState()
    }

    async elementAssertion(){
        await expect(this.page.locator(this.loginElements.emailId)).toBeVisible()
        await expect(this.page.locator(this.loginElements.passwordId)).toBeVisible()
        await expect(this.page.locator(this.loginElements.submitId)).toBeVisible()
    }

    async eventLogin(userId:string,password:string){
        await this.page.locator(this.loginElements.emailId).fill(userId)
        await this.page.locator(this.loginElements.passwordId).clear()
        await this.page.locator(this.loginElements.passwordId).fill(password)
        await this.page.locator(this.loginElements.submitId).click()
    }

}