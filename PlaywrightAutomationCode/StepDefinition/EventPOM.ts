import { Given, When, Then} from '@cucumber/cucumber'

import { expect } from '@playwright/test'

import { pageFixture } from '../hooks/pageFixture'

import { EventLoginPage } from '../Pages/EventLoginPage'

import { userDetails } from '../TestData/eventLogin.json'

let elp:EventLoginPage

Given('I am on the EventHub login page',async function(){
    await pageFixture.page.goto('https://eventhub.rahulshettyacademy.com/login')
});

Then('I enter valid login credentials',async function(){
    elp=new EventLoginPage(pageFixture.page)
    await elp.waitPage()

});

Then('I should be redirected to the events dashboard page',async function(){
    await elp.elementAssertion()
    await elp.eventLogin(userDetails.userId,userDetails.password)
    await expect(pageFixture.page).toHaveURL('https://eventhub.rahulshettyacademy.com/')
});

Then('I reload the active browser webpage window',async function(){
    const pageUrl=await pageFixture.page.url()
    console.log('****************************************************')
    console.log('Before Reload:Page URL ',pageFixture.page.url())
    await pageFixture.page.reload( { waitUntil: 'load' })
    console.log('After Reload:Page URL ',pageFixture.page.url())
    await expect(pageFixture.page).toHaveURL(pageUrl)
})

Given('I clear all session cookies and local storage tokens',async function(){
    await pageFixture.page.context().clearCookies();
    // await pageFixture.page.evaluate(() => {
    //     window.localStorage.clear();
    //     window.sessionStorage.clear();
    // })
})

Then('I direct-navigate to the {string} dashboard URL',async function(endpoint:string){
    await pageFixture.page.goto('https://eventhub.rahulshettyacademy.com'+endpoint)
    const pageTitle=await pageFixture.page.url()
})

Then('I should be automatically intercepted and redirected to the {string} page',async function(endpoint:string){
    await expect(pageFixture.page).toHaveURL('https://eventhub.rahulshettyacademy.com'+endpoint)
    console.log('Before Reload:Page URL ',pageFixture.page.url())
    console.log('****************************************************')
})