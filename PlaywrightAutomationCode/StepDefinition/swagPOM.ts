import {Given,setDefaultTimeout,Then} from '@cucumber/cucumber'

import { Page } from '@playwright/test'

import { pageFixture } from '../hooks/pageFixture'

import { SwagLoginPage } from '../Pages/swagLoginPage'

let slp:SwagLoginPage

let page:Page

setDefaultTimeout(60*1000)

Given('Launch the Swag broswer POM',async function(){   
    await pageFixture.page.goto('https://www.saucedemo.com/')
});

Then('Enter Username and password POM',async function(){
    
    slp=new SwagLoginPage(pageFixture.page)
    await slp.verifyWebelementsInLoginPage()
    await slp.locateElementsInLoginPage()
});

