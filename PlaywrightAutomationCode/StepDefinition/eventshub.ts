import {Given, Then, When} from '@cucumber/cucumber'

import {Browser, Page, chromium} from '@playwright/test'

let browser:Browser,page:Page

let context

Given('Open the safari browser', async function () {
    browser = await chromium.launch({
        headless:false,
        args:['--start-maximized']
    })

    context=await browser.newContext({
        viewport: null
    })

    page=await context.newPage()
});

When('Open the Application', async function () {
    await page.goto("https://eventhub.rahulshettyacademy.com/login",{timeout:5000})
});

Then('Book an event', async function () {

    console.log("*****LOGIN ******")
    await page.getByPlaceholder("you@email.com").fill("harshitha.radhakrishnan08@gmail.com")
    await page.waitForTimeout(5000)

    await page.getByLabel("Password").fill("Jagan.2435")
    await page.waitForTimeout(5000)

    await page.getByRole('button',{name:'Sign In'}).click()
    await page.waitForTimeout(5000)

    page.locator('[data-testid="book-now-btn"][href="/events/284"]').scrollIntoViewIfNeeded()
    await page.locator('[data-testid="book-now-btn"][href="/events/284"]').click()   
    await page.waitForTimeout(5000)

    await page.getByRole('button',{name:'+'}).click()
    await page.waitForTimeout(5000)

    await page.locator('[id="customerName"]').fill("Harshitha Radhakrishnan") // using css id
    await page.waitForTimeout(5000)
    
    await page.getByTestId('customer-email').fill("harshi.krishnan8@gmail.com")
    await page.waitForTimeout(5000)

    await page.getByPlaceholder('+91 98765 43210').fill('2622715236')
    await page.waitForTimeout(5000)

    //await page.getByRole('button',{name:'Confirm Booking'}).click()
    await page.locator('//*[@id="confirm-booking"]').click()  // Relative path 
    await page.waitForTimeout(5000)

    await page.getByRole('button',{name:'View My Bookings'}).click()
    await page.waitForTimeout(5000)
});

Then('Cancel an event',async function () {
    // count the total bookings   
    var bookCount=await page.getByTestId('booking-card').count()
    await page.waitForTimeout(3000)
    console.log("The total Bookings are ",bookCount)  

    while (await page.locator('[data-testid="booking-card"]').filter({ hasText: 'Hollywood Monsoon' }).count() > 0) {
        await page.locator('[data-testid="booking-card"]')
            .filter({ hasText: 'Hollywood Monsoon' })
            .first()
            .getByRole('button', { name: 'Cancel Booking' })
            .click();

        await page.getByRole('button',{name:'Yes, cancel it'}).click()    
    }
})

Then('close the browser', async function () {
    await page.close()
});

