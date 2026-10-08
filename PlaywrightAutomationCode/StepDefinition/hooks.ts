// //import cucumber gherkin kewords
// import {Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
// //import hook annotations from cucumber
// import {BeforeAll, AfterAll, Before, After} from '@cucumber/cucumber'   
// //import Browser, Context and Page for Playwright automation    
// import {Browser,chromium,Page,BrowserContext,} from '@playwright/test'
// //import pageFixture object from pageFixture.ts file
// import {pageFixture} from '../hooks/pageFixture'
// //import path and process modules from Node.js to handle file paths and process information
// import path from 'path'
// import process from 'process'

// let browser:Browser, page:Page, context:BrowserContext

// setDefaultTimeout(80000) // Set default timeout for all steps to 60 seconds

// BeforeAll(async function () {
// //Initilaize the browswer    
//     browser = await chromium.launch({ 
//         headless:false,
//         args:["--start-maximized"]
//     })
// });

// Before(async function () {
//     // Context - one session on the window - record video of test execution  
//     // Page - one tab on the window
//     context =await browser.newContext({
//         recordVideo: { dir:'test-result/videos'},
//         viewport:null
//     })
//     // Create a new page in the context and assign it to the pageFixture object
//     page = await context.newPage()
//     pageFixture.page = page

//     //Tracing the test execution and capturing screenshots for debugging purposes
//     await context.tracing.start({
//         screenshots:true,
//         snapshots:true,
//         sources:true
//     })
// });

// After(async function(scenario){
//     //Stop tracing and save the trace file to the specified directory
//     const traceName=scenario.pickle.name.replace(/[^a-zA-Z0-9]/g,'_')
//     const tracePath=path.join(process.cwd(),`Reports/trace/${traceName}.zip`)
//     await context.tracing.stop({path:tracePath})

//     //Close the page
//     await page.close()
//     await context.close()
// });

// AfterAll(async function(){
//     //close the contexts and the browser

//     await browser.close()
// })

// Given('I open the Automation practice page', async function () {
//     await page.goto("https://testautomationpractice.blogspot.com/")
// });

// Then('I practice locators', async function () {
//     //Playwright locators - getByRole,getByText,getByAltText,getByPlaceholder,getByLabel,getByTitle,getByTestId
//     //name field
//     await page.getByPlaceholder('Enter Name').fill('Jaganathan')
//     await page.waitForTimeout(2000)
//     await page.locator('#name').clear()
//     await page.locator('//input[@id="name"]').type('Harshitha')
//     // await page.waitForTimeout(2000)

//     //email field
//     await page.locator('*[id="email"]').fill('jaganathans86@gmail.com')
//     // await page.waitForTimeout(2000)
//     await page.locator('//input[contains(@id,"email")]').clear()
//     // await page.waitForTimeout(2000)
//     await page.locator('//input[starts-with(@id,"em")]').fill('harshi.krishnan8@gmail.com')
//     // await page.waitForTimeout(2000)

//     //phone field
//     await page.locator('//div[@class="form-group"]//child::input').nth(2).fill('2622715236')
//     //  await page.waitForTimeout(2000)
//     await page.locator('//label[text()="Phone:"]//following-sibling::input').clear()
//     //  await page.waitForTimeout(2000)
//     await page.locator('//div[@class="form-group"]//child::input[last()]').first().fill('2625015571')
//     //  await page.waitForTimeout(2000)

//     //Address Field
//     await page.locator('//label[text()="Address:"]//following-sibling::textarea').fill('10016 65th st')
//     await page.getByLabel('Address:').type('Kenosha, WI-53142')
//     // await page.waitForTimeout(2000)     

//     //Gender Field
//     await page.getByRole('radio', { name: 'Male', exact: true }).click()
//     await page.locator('//label[@for="female"]').click()

//     //checkbox - weekdays
//     const checkboxLocator = await page.locator('//div[@class="form-group"]//child::input[@type="checkbox"]');
//     const count = await checkboxLocator.count();
//     const allbox = await checkboxLocator.all()

//     //select all -- The locator has all 7 elements and select using loop for each element
//     for (let check of allbox) {
//         await check.click()
//     }
//     // await page.waitForTimeout(5000)

//     //uncheck all
//     for (let uncheck of allbox) {
//         await uncheck.uncheck()
//     }

//     //select ony weekdays
//     for (let i = 0; i < count; i++) {
//         if (i >= 1 && i <= 5) {
//             await checkboxLocator.nth(i).check()
//         }
//     }
//     // await page.waitForTimeout(3000)

//     //Dynamic Button 
//     //double click
//     await page.getByRole('button', { name: 'START' }).dblclick()
//     // await page.waitForTimeout(3000)

//     //click through loop 
//     for (let i = 0; i < 3; i++) {
//         await page.locator('//button[@onclick="toggleButton(this)"]').click()
//     }
//     // await page.waitForTimeout(3000)

//     //right click 
//     // await page.locator("//button[starts-with(@onclick,'toggleButton')]").click({ button: 'right' })

//     // await page.waitForTimeout(3000)

//     //Alert & Popups
//     //alert button click
//     await page.locator('//div[@class="widget-content"]//child::button[@id="alertBtn"]').click()
//     // await page.waitForTimeout(3000)        

//     //confirmation alert click
//     await page.getByRole("button", { name: 'Confirmation Alert' }).click()
//     // await page.waitForTimeout(3000)

//     //Prompt Alert click
//     await page.locator('button[id="promptBtn"]').click()
//     // await page.waitForTimeout(3000)

//     //Mouse Hover 
//     //hover 
//     await page.locator('//div[@class="dropdown"]//child::button[text()="Point Me"]').scrollIntoViewIfNeeded()

//     await page.locator('//div[@class="dropdown"]//child::button[text()="Point Me"]').hover()
//     await page.waitForTimeout(3000)

//     //select option using click
//     await page.locator('//div[@class="dropdown"]//descendant::a[text()="Mobiles"]').click();
//     await page.waitForTimeout(3000)

//     //Double Click  -- recheck again
//     await page.locator('//input[@id="field1"]').fill(" By Harshitha")
//     // await page.waitForTimeout(3000)

//     await page.locator('//div[@class="widget-content"]//child::button[text()="Copy Text"]').dblclick()
//     // await page.waitForTimeout(3000)

//     //Labels and Links 
//     //Get child name in text
//     var mobile = await page.locator('//div[@id="mobiles"]/child::label').allInnerTexts()

//     console.log("The mobiles are ", mobile)
//     await page.waitForTimeout(3000)

//     //Table    
//     // 1. gets all contents in tr in an array 
//     var rowcontent = await page.locator('//table[@id="productTable"]//descendant::tr').all()
//     console.log("The rows in tables ", rowcontent)
//     //2.  in for  loop check each row has matching name 
//     for (let row of rowcontent) {
//         const matchedRow = row.filter({ hasText: 'Smartphone' })
//         //3.If the row has matching element, check the corresponding checkbox    
//         if (await matchedRow.count() > 0) {
//             await matchedRow.locator('input[type="checkbox"]').click();
//             break; // Exit the loop since we found our target row
//         }
//     }
//     await page.waitForTimeout(3000)

//     // static web table 
//     // get the price of Learn JS
//     // 1. Get all row rows in a table using all()
//     let statTable = await page.locator('//table[@name="BookTable"]//descendant::tr').all()
//     console.log("The texts are ", statTable)

//     // Using all book name
//     for (let rows of statTable) {
//         const books = await rows.filter({ hasText: 'Learn JS' })

//         if (await books.count() > 0) {
//             const price = await books.locator('//td').nth(3).innerText()
//             console.log(price)
//         }
//     }
//     await page.waitForTimeout(3000)

//     //No.of books authored by "Mukesh"
//     const booksTableLoc = await page.locator('//table[@Name="BookTable"]//descendant::tr').all()
//     let books = []
//     for (let rows of booksTableLoc) {
//         const rowsloc = rows.filter({ hasText: 'Mukesh' })
//         if (await rowsloc.count() > 0) {
//             books.push(await rowsloc.locator('//td').nth(0).innerText())
//         }
//     }
//     console.log("The Books written by author Mukesh is ", books)

//     //Dynamic Web table 
//     const tableRows = await page.locator('//table[@id="taskTable"]//descendant::tr').all()
//     const elementarray: string[][] = []
//     for (let row of tableRows) {
//         // const filteredRow=await row.filter({hasText:'Internet Explorer'})
//         // console.log(row)
//         // if(await filteredRow.count()>0){
//         const elements = await row.locator('//td').allInnerTexts()
//         if (elements.length > 0) {
//             elementarray.push(elements)
//         }
//         //     break
//         // }
//         console.log(elementarray)
//     }
//     await page.waitForTimeout(3000)
// });
