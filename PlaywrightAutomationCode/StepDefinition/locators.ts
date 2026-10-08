
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'

import { Browser, chromium, expect, Page } from '@playwright/test'

import TestDataArray from '../TestData/TestData.json'

import { Sample1 } from '../TestData/TestData1.json'

let browser: Browser, page: Page

let context

setDefaultTimeout(90 * 1000);

Given('Launch the Chrome Browser', async function () {
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    })

    context = await browser.newContext({
        viewport: null
    })

    page = await context.newPage()
})

Given('I open the Automation practice page', async function () {
    await page.goto("https://testautomationpractice.blogspot.com/")
});

Then('Practice locators', async function () {
    //following-sibling 
    let element = await page.locator('//input[@id="name"]/following-sibling::*').all()
    console.log("The siblings are: ", element.length) // 4 - all following siblings
    await page.waitForTimeout(2000)

    let labElement = await page.locator('//input[@placeholder="Enter Name"]/following-sibling::label').all()
    console.log("The siblings with label tag are: ", labElement.length) //2 element with tag label
    await page.waitForTimeout(2000)
    //preceeding-sibling
    let preelement = await page.locator('//input[contains(@id,"name")]/preceding-sibling::*').all()
    console.log("The preceeding sibling ", preelement) //1 element
    await page.waitForTimeout(2000)

    //parent
    let parelement = await page.locator('//input[starts-with(@id,"name")]/parent::*').all()
    console.log("The parent is", parelement.length) //1

    //child
    let childelement = await page.locator('//label[text()="Name:"]/child::*').all()
    console.log("The Child element is ", childelement.length) //0

    // ancestor (parents of parent)
    let anceselement = await page.locator('//label[text()="Name:"]/ancestor::*').all()
    console.log("The ancestor count is ", anceselement.length) // 22 all elements

    // ancestor with div tag
    let divancelement = await page.locator('//label[text()="Name:"]/ancestor::div').all()
    console.log("The ancestor count is ", divancelement.length) // 20 ancestor elements with div tag

    //descendant (child of child)
    let deselement = await page.locator('//input[starts-with(@id,"ph")]/descendant::*').all()
    console.log("The descendant count is ", deselement.length) //0

    //following 
    let follelement = await page.locator('//label[text()="Name:"]/following::*').all()
    console.log("The following element is ", follelement.length) //641 nodes after  this node

    //preceeding
    let precelement = await page.locator('//label[text()="Name:"]/preceding::*').all()
    console.log("The following element is ", precelement.length) //153 nodes before current element
});

When('Launch the practice Site', async function () {
    await page.goto("https://testautomationpractice.blogspot.com/")
    //Practice page methods
    await page.reload()
    await page.waitForTimeout(2000)
    await page.bringToFront()
    await page.waitForTimeout(2000)
});

Then('Practice Action methods', async function () {
    //click methods
    await page.getByRole('button', { name: 'Simple Alert' }).click() //playwright locator
    await page.waitForTimeout(2000)

    await page.locator('//div[@class="widget-content"]/child::button').nth(0).dblclick()
    await page.waitForTimeout(2000)

    // await page.locator('//div[@class="widget-content"]/child::button').nth(0).click({button:'right'})
    // await page.waitForTimeout(2000)

    //fill and clear method 

    await page.locator('[id="Wikipedia1_wikipedia-search-input"]').fill("Testing")
    await page.waitForTimeout(2000)

    await page.locator('//*[@id="Wikipedia1_wikipedia-search-input"]').clear()
    await page.waitForTimeout(2000)

    // check , uncheck, setchecked method
    // await page.getByLabel('Male').click()
    await page.getByRole('radio', { name: 'Male', exact: true }).click()
    await page.waitForTimeout(2000)

    await page.locator('//div[@class="form-group"]//descendant::label').nth(8).click()
    await page.waitForTimeout(2000)

    await page.locator('//div[@class="form-group"]//descendant::label').nth(8).setChecked(false)
    await page.waitForTimeout(2000)

    await page.locator('//div[@class="form-group"]//descendant::label').nth(9).setChecked(true)
    await page.waitForTimeout(2000)

    await page.locator('//div[@class="form-group"]//descendant::label').nth(13).setChecked(true)
    await page.waitForTimeout(2000)

    //scroll and hover    
    await page.getByRole('button', { name: 'Point Me' }).scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    await page.getByRole('button', { name: 'Point Me' }).hover()
    await page.waitForTimeout(2000)

    // drag and drop 

    await page.locator('//div[@id="draggable"]').scrollIntoViewIfNeeded()
    let dragElement = page.locator('//div[@id="draggable"]')

    let dropElement = page.locator('//div[@id="droppable"]')

    dragElement.dragTo(dropElement)
    await page.waitForTimeout(2000)

    //highlight
    page.getByText('Data Entry Form').scrollIntoViewIfNeeded()
    await page.getByText('Data Entry Form').highlight()
    await page.waitForTimeout(2000)

    // inner Text 
    let text = await page.locator('//*[text()="Prompt Alert"]').innerText()
    console.log("Inner Text of the element ", text) //prompt Alert

    let text1 = await page.locator('//*[text()="Alerts & Popups"]').innerText()
    console.log("Inner Text is ", text1)

    // inner HTML
    let innhtml = await page.locator('//*[text()="Prompt Alert"]').innerHTML()
    console.log("Inner HTML of the element ", innhtml)

    let innhtml1 = await page.locator('//*[text()="Alerts & Popups"]').innerHTML()
    console.log("Inner Text is ", innhtml1)

    // All inner Texts
    //let alltexts=await page.locator('//div[@class="widget-content"]').nth(6).allInnerTexts()
    let alltexts = await page.locator('//div[@class="container"]').nth(0).allInnerTexts()
    console.log("All inner text ", alltexts)

    const links = await page.locator('.link').allInnerTexts();
    console.log(links);

    // All inner HTML
    const HTMLlinks = await page.locator('.link').allTextContents();
    console.log(HTMLlinks);

    let allinnHTML = await page.locator('//div[@class="container"]').nth(0).allTextContents()
    console.log("All text content ", allinnHTML.length)

});

Then('I practice locators', async function () {
    //Playwright locators - getByRole,getByText,getByAltText,getByPlaceholder,getByLabel,getByTitle,getByTestId
    //name field
    await page.getByPlaceholder('Enter Name').fill('Jaganathan')
    // await page.waitForTimeout(2000)
    await page.locator('#name').clear()
    await page.locator('//input[@id="name"]').type('Harshitha')
    // await page.waitForTimeout(2000)

    //email field
    await page.locator('*[id="email"]').fill('jaganathans86@gmail.com')
    // await page.waitForTimeout(2000)
    await page.locator('//input[contains(@id,"email")]').clear()
    // await page.waitForTimeout(2000)
    await page.locator('//input[starts-with(@id,"em")]').fill('harshi.krishnan8@gmail.com')
    // await page.waitForTimeout(2000)

    //phone field
    await page.locator('//div[@class="form-group"]//child::input').nth(2).fill('2622715236')
    //  await page.waitForTimeout(2000)
    await page.locator('//label[text()="Phone:"]//following-sibling::input').clear()
    //  await page.waitForTimeout(2000)
    await page.locator('//div[@class="form-group"]//child::input[last()]').first().fill('2625015571')
    //  await page.waitForTimeout(2000)

    //Address Field
    await page.locator('//label[text()="Address:"]//following-sibling::textarea').fill('10016 65th st')
    await page.getByLabel('Address:').type('Kenosha, WI-53142')
    // await page.waitForTimeout(2000)     

    //Gender Field
    await page.getByRole('radio', { name: 'Male', exact: true }).click()
    await page.locator('//label[@for="female"]').click()

    //checkbox - weekdays
    const checkboxLocator = await page.locator('//div[@class="form-group"]//child::input[@type="checkbox"]');
    const count = await checkboxLocator.count();
    const allbox = await checkboxLocator.all()

    //select all -- The locator has all 7 elements and select using loop for each element
    for (let check of allbox) {
        await check.click()
    }
    // await page.waitForTimeout(5000)

    //uncheck all
    for (let uncheck of allbox) {
        await uncheck.uncheck()
    }

    //select ony weekdays
    for (let i = 0; i < count; i++) {
        if (i >= 1 && i <= 5) {
            await checkboxLocator.nth(i).check()
        }
    }
    // await page.waitForTimeout(3000)

    //Dynamic Button 
    //double click
    await page.getByRole('button', { name: 'START' }).dblclick()
    // await page.waitForTimeout(3000)

    //click through loop 
    for (let i = 0; i < 3; i++) {
        await page.locator('//button[@onclick="toggleButton(this)"]').click()
    }
    // await page.waitForTimeout(3000)

    //right click 
    await page.locator("//button[starts-with(@onclick,'toggleButton')]").click({ button: 'right' })

    // await page.waitForTimeout(3000)

    //Alert & Popups
    //alert button click
    await page.locator('//div[@class="widget-content"]//child::button[@id="alertBtn"]').click()
    // await page.waitForTimeout(3000)        

    //confirmation alert click
    await page.getByRole("button", { name: 'Confirmation Alert' }).click()
    // await page.waitForTimeout(3000)

    //Prompt Alert click
    await page.locator('button[id="promptBtn"]').click()
    // await page.waitForTimeout(3000)

    //Mouse Hover 
    //hover 
    await page.locator('//div[@class="dropdown"]//child::button[text()="Point Me"]').scrollIntoViewIfNeeded()

    await page.locator('//div[@class="dropdown"]//child::button[text()="Point Me"]').hover()
    // await page.waitForTimeout(5000)

    //select option using click
    await page.locator('//div[@class="dropdown"]//descendant::a[text()="Mobiles"]').click()
    await page.waitForTimeout(3000)

    //Double Click  -- recheck again
    await page.locator('//input[@id="field1"]').fill(" By Harshitha")
    // await page.waitForTimeout(3000)

    await page.locator('//div[@class="widget-content"]//child::button[text()="Copy Text"]').dblclick()
    // await page.waitForTimeout(3000)

    //Labels and Links 
    //Get child name in text
    var mobile = await page.locator('//div[@id="mobiles"]/child::label').allInnerTexts()

    console.log("The mobiles are ", mobile)
    await page.waitForTimeout(3000)

    //Table    
    // 1. gets all contents in tr in an array 
    var rowcontent = await page.locator('//table[@id="productTable"]//descendant::tr').all()
    console.log("The rows in tables ", rowcontent)
    //2.  in for  loop check each row has matching name 
    for (let row of rowcontent) {
        const matchedRow = row.filter({ hasText: 'Smartphone' })
        //3.If the row has matching element, check the corresponding checkbox    
        if (await matchedRow.count() > 0) {
            await matchedRow.locator('input[type="checkbox"]').click();
            break; // Exit the loop since we found our target row
        }
    }
    await page.waitForTimeout(3000)

    // static web table 
    // get the price of Learn JS
    // 1. Get all row rows in a table using all()
    let statTable = await page.locator('//table[@name="BookTable"]//descendant::tr').all()
    console.log("The texts are ", statTable)

    // Using all book name
    for (let rows of statTable) {
        const books = await rows.filter({ hasText: 'Learn JS' })

        if (await books.count() > 0) {
            const price = await books.locator('//td').nth(3).innerText()
            console.log(price)
        }
    }
    await page.waitForTimeout(3000)

    //No.of books authored by "Mukesh"
    const booksTableLoc = await page.locator('//table[@Name="BookTable"]//descendant::tr').all()
    let books = []
    for (let rows of booksTableLoc) {
        const rowsloc = rows.filter({ hasText: 'Mukesh' })
        if (await rowsloc.count() > 0) {
            books.push(await rowsloc.locator('//td').nth(0).innerText())
        }
    }
    console.log("The Books written by author Mukesh is ", books)

    //Dynamic Web table 
    const tableRows = await page.locator('//table[@id="taskTable"]//descendant::tr').all()
    const elementarray: string[][] = []
    for (let row of tableRows) {
        const elements = await row.locator('//td').allInnerTexts()
        if (elements.length > 0) {
            elementarray.push(elements)
        }
        console.log(elementarray)
    }
    await page.waitForTimeout(3000)
});

Then('I practice table in static way', async function () {
    let expectedAuthor = "Amod"
    let actualAuthor = await page.locator('//table[@name="BookTable"]//tr[6]/td[2]').innerText()
    if (expectedAuthor == actualAuthor) {
        console.log("The actual and expected element are same")
    } else {
        console.log("The actual and expected element are not same")
    }
});

Then('I practice table in dynamic way', async function () {

    // Static Table   
    let expectedSub = "Javascript"
    let rows = await page.locator('//table[@name="BookTable"]//tr').all()

    for (let i = 2; i <= rows.length; i++) {
        let columns = await page.locator('//table[@name="BookTable"]//tr[' + i + ']/td').all()
        for (let j = 1; j <= columns.length; j++) {
            let element = await page.locator('//table[@name="BookTable"]//tr[' + i + ']/td[' + j + ']').innerText()
            if (expectedSub == element) {
                console.log(expectedSub, ' is identified in row num ', i, ' and column num', j)
            }
        }
    }
    //Dynamic Table 
    let name = "Internet Explorer"
    let rows1 = await page.locator('//table[@id="taskTable"]//tbody[@id="rows"]//tr').all()
    for (let i = 1; i <= rows1.length; i++) {
        let columns1 = await page.locator('//table[@id="taskTable"]//tbody[@id="rows"]//tr[' + i + ']/td').all()
        for (let j = 1; j <= columns1.length; j++) {
            let element = await page.locator('//table[@id="taskTable"]//tbody[@id="rows"]//tr[' + i + ']/td[' + j + ']').innerText()
            if (name == element) {
                console.log(name, ' is identified in row num ', i, ' and column num', j)
            }
        }
    }

    // Get the details for Internet Explorer
    let rows2 = await page.locator('//table[@id="taskTable"]//tbody[@id="rows"]//tr').all()
    for (let i = 1; i <= rows2.length; i++) {
        let columns2 = await page.locator('//table[@id="taskTable"]//tbody[@id="rows"]//tr[' + i + ']/td[1]').innerText()
        if (columns2 == name) {
            let elements = await page.locator('//table[@id="taskTable"]//tbody[@id="rows"]//tr[' + i + ']/td').allInnerTexts()
            console.log("The elements are ", elements)
        }
    }

    //Get headers of the table 

    let headers = await page.locator('//table[@id="taskTable"]//thead').allInnerTexts()
    console.log("The header details of the table are ", headers)

});

Then('I practice calender in static way', async function () {
    //Date Picker 2
    await page.locator('//*[@id="txtDate"]').scrollIntoViewIfNeeded()
    await page.locator('//*[@id="txtDate"]').click()
    await page.locator('//*[@class="ui-datepicker-calendar"]/tbody/tr[3]/td[4]').click()
    await page.waitForTimeout(3000)
});

Then('I practice calender in dynamic way', async function () {
    // Date Picker 1 - set todays Date 
    let datefield = await page.locator('//*[@id="datepicker"]').click()
    let datetable = await page.locator('//*[@class="ui-datepicker-calendar"]').isVisible()
    if (datetable == true) {
        let todaysDate = new Date()
        let date = todaysDate.getDate() // get the date
        let daterows = await page.locator('//*[@class="ui-datepicker-calendar"]/tbody/tr').all()
        for (let i = 1; i <= daterows.length; i++) {
            let datecolumns = await page.locator('//*[@class="ui-datepicker-calendar"]/tbody/tr[' + i + ']/td').all()
            for (let j = 1; j <= datecolumns.length; j++) {
                let element = await page.locator('//*[@class="ui-datepicker-calendar"]/tbody/tr[' + i + ']/td[' + j + ']').innerText()
                if (date == parseInt(element)) {
                    await page.locator('//*[@class="ui-datepicker-calendar"]/tbody/tr[' + i + ']/td[' + j + ']').click()
                    await page.waitForTimeout(5000)
                    console.log("todays date is ", date, " and the table element is ", element)
                }
            }
        }
    }

    await page.locator('//*[@id="datepicker"]').clear()
    await page.waitForTimeout(3000)

    // Date picker1 -mm/dd/yyyy
    let todaysDate = new Date()
    let futureDate = new Date(todaysDate)
    futureDate.setDate(futureDate.getDate() + 100)
    let date = futureDate.getDate()
    let month = futureDate.getMonth() + 1
    let year = futureDate.getFullYear()
    let newDate = month + "/" + date + "/" + year
    await page.locator('//*[@id="datepicker"]').fill(newDate)
    await page.waitForTimeout(3000)

});

Then('I take screenshots', async function () {
    //Take screenshot of individual element - save in project directory
    await page.locator('#phone').pressSequentially('9443936339')
    await page.waitForTimeout(3000)
    await page.locator('#phone').screenshot({ path: './phoneelement.png' })

    // Take screenshot of the page and save in a different folder   
    //Clear and enter text using keyboard methods
    await page.locator('#field1').scrollIntoViewIfNeeded()
    await page.locator('#field1').press('Control+A')
    await page.keyboard.press('Delete')
    await page.keyboard.up('Control')
    await page.keyboard.insertText('Hello World Again')
    await page.waitForTimeout(2000)

    //pagelevel screenshot 
    await page.screenshot({ path: './Screenshots/page1.jpg' })

    //Full web page screenshot 
    await page.locator('#name').type('Harshitha')
    await page.locator('#email').fill('harshi.krishnan8@gmail.com')
    await page.locator('#phone').pressSequentially('9443936339')
    await page.locator('#textarea').fill('2432 Sringdale Road,\n Waukesha \n Wisconsin-53142')
    await page.locator('//div[@class="form-check form-check-inline"]//input[@id="female"]').click()
    var checkBoxes = await page.locator('//div[@class="form-group"]//input[@type="checkbox"]').all()
    for (let i = 0; i < checkBoxes.length; i++) {
        if (i >= 1 && i <= 5) {
            await checkBoxes[i].click()
        }
    }
    await page.locator('#country').selectOption("United States")
    await page.locator('#colors').selectOption([{ index: 1 }, { index: 2 }, { index: 3 }])
    await page.locator('#animals').selectOption(['Zebra', 'Elephant'])
    await page.locator('#comboBox').scrollIntoViewIfNeeded()
    
    await page.waitForTimeout(3000)
    await page.locator('#comboBox').click()
    
    await page.waitForTimeout(3000)
    await page.locator('#dropdown').getByText('Item 15').click()

    await page.waitForTimeout(3000)


    // DatePicker1 [mm/dd/yyyy]
    let currentDate = new Date()
    let futureDate = new Date(currentDate)
    futureDate.setDate(futureDate.getDate() + 100)
    let date = futureDate.getDate()
    let month = futureDate.getMonth() + 1
    let year = futureDate.getFullYear()
    let shortMonth = futureDate.toLocaleDateString('en-us', { 'month': 'short' })
    let datepicker1 = month + "/" + date + "/" + year
    await page.locator('#datepicker').nth(0).fill(datepicker1)
    await page.locator('#datepicker').nth(0).click()

    //DatePicker2 [dd/mm/yyyy]
    let date2 = await page.locator('#txtDate').nth(0)
    await date2.click()
    await page.locator('.ui-datepicker-month').selectOption({ index: month - 1 })
    await page.locator('.ui-datepicker-year').selectOption(year.toString())

    if (await date2.isVisible()) {
        let date2rows = await page.locator('//table[@class="ui-datepicker-calendar"]/tbody/tr').all()
        for (let i = 1; i <= date2rows.length; i++) {
            let date2columns = await page.locator('//table[@class="ui-datepicker-calendar"]/tbody/tr[' + i + ']/td').all()
            for (let j = 1; j <= date2columns.length; j++) {
                let element = await page.locator('//table[@class="ui-datepicker-calendar"]/tbody/tr[' + i + ']/td[' + j + ']').innerText()
                if (parseInt(element) === date) {
                    await page.locator('//table[@class="ui-datepicker-calendar"]/tbody/tr[' + i + ']/td[' + j + ']').click()
                    break
                }
            }
        }
    }
    //DatePicker2
    let date3=new Date()
    await page.locator('#start-date').fill(date3.toLocaleDateString('sv-SE'))
    await page.waitForTimeout(3000)

    let date4=new Date(date3)
    date4.setDate(date4.getDate()+100)
    await page.locator('#end-date').fill(date4.toLocaleDateString('sv-SE'))
    await page.waitForTimeout(3000)

    //Submit button 
    await page.locator('.submit-btn').click()
    //await page.getByRole('button',{name:'Submit'}).click()
    await page.waitForTimeout(3000)
    await page.screenshot({ path: './screenshots/fullpage.png', fullPage: true })

    //Upload File 
    await page.locator('#singleFileInput').setInputFiles("./Screenshots/page1.jpg")
    await page.getByRole('button', { name: 'Upload Single File' }).click()
     await page.waitForTimeout(3000)

    // Multiple upload files - 
    await page.locator('#multipleFilesInput').setInputFiles(['./Screenshots/page1.jpg', 'C:\\Users\\Desktop\\Harshitha _ folder\\Testing docs\\Playwright\\playwright_class\\Playwright\\Playwright_Practice\\Screenshots\\fullpage.png'])
    await page.getByRole('button', { name: 'Upload Multiple Files' }).click()

    await page.waitForTimeout(2000)
    await page.screenshot({ path: './screenshots/fullpage.png', fullPage: true })
});

Then('I practice pagination Table',async function(){
    let prodcutArray=['Laptop','Digital Camera','Desktop Computer','Soundbar']
    const totalTables=await page.locator('//ul[@id="pagination"]//child::li').all()
    await page.waitForTimeout(2000)
    for(let i=0;i<totalTables.length;i++){
        await page.locator('//ul[@id="pagination"]//child::li').nth(i).click()
        await page.waitForTimeout(2000)
        await expect(page.locator('#productTable')).toBeTruthy()
        let rows=await page.locator('//table[@id="productTable"]//tbody//tr').all()
        for(let j=1;j<=rows.length;j++){
            let columns=await page.locator('//table[@id="productTable"]//tbody//tr['+j+']//td').all()
            for(let k=1;k<=columns.length;k++){
                let element=await page.locator('//table[@id="productTable"]//tbody//tr['+j+']//td['+k+']').innerText()
                console.log('The elements are ',element)
                for(let product of prodcutArray){
                    if(product==element){
                        await page.locator('//table[@id="productTable"]//tbody//tr['+j+']//td['+(k+2)+']/input').click()
                        await page.waitForTimeout(2000)
                    }
                }
            }
        }
    }
    await page.waitForTimeout(3000)
});
Then('I practice shadow DOM in ATP',async function(){
    await page.locator('#shadow_host').locator('#shadow_content').locator('.info').hover()
    await page.waitForTimeout(3000)

    await page.locator('#shadow_host').locator('[href="https://www.pavantestingtools.com/"]').click()
    await page.waitForTimeout(3000)
    await page.bringToFront()
    await page.goBack()
    await page.waitForTimeout(3000)
    await page.locator('#shadow_host').locator('[type="text"]').fill("Happy Testing")
    await page.waitForTimeout(3000)   

})

When('I open the Shadow DOM practice page', async function () {
    await page.goto('https://selectorshub.com/xpath-practice-page/')
});

Then('I practice shadow DOM', async function () {
    //Click learning tab in shadow DOM 
    await page.locator('#userName').scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)
    await page.locator('#userName').getByText('Learning Hub').click()
    await page.waitForTimeout(2000)

    //Fill the Username 
    await page.locator('#userName').getByPlaceholder('enter name').fill('Sahaarikhaa')
    await page.waitForTimeout(2000)

    //Fill the Pizza name 
    await page.locator('#userName').locator('#app2').locator('#pizza').fill('Thin Crust')
    await page.waitForTimeout(2000)

});

Then('I practice dummy form with direct input', async function () {
    //Enter User Email - this is done because the element is readable - to make it editable -click and fill
    const isEditable = await expect(page.locator('//input[@dataid="sh_email1"]')).not.toBeEditable()
    console.log('The element is ', isEditable)
    const emailInput = page.locator('[dataid="sh_email1"]');
    await emailInput.click()
    await emailInput.fill('shanvika@example.com');
     
    //Enter password 
    await page.locator('#pass').fill('kalpana1234')

    //Enter company 
    await page.locator('//input[@name="company"]').nth(0).fill('CTS')

    //Enter Mobile 
    await page.locator('//input[@name="mobile number"]').nth(0).fill('9443936339')

    //Enter Country 
    await page.locator('//label[text()="Country"]//child::input[@type="text"]').fill('United States')

    //Submit the information 
    await page.getByRole('button', { name: 'Submit' }).hover()
    await page.getByRole('button', { name: 'Submit' }).click()
 
    //Table 
    let tableRows = await page.locator('//table[@id="resultTable"]//tbody//tr').all()
    for (let i = 1; i <= tableRows.length; i++) {
        let tableCols = await page.locator('//table[@id="resultTable"]//tbody//tr[' + i + ']//td').all()
        for (let j = 1; j <= tableCols.length; j++) {
            let element = await page.locator('//table[@id="resultTable"]//tbody//tr[' + i + ']//td[' + j + ']').innerText()
            if (element == "ESS") {
                await page.locator('//table[@id="resultTable"]//tbody//tr[' + i + ']//td[' + (j - 2) + ']').click()
            }
        }
    }
});

Then('I practice dummy form with input from JSON file', async function () {
    const testDataList = Object.values(TestDataArray)

    for (const TestData of testDataList) {
        //Enter User Email - this is done because the element is readable - to make it editable -click and fill
        // const isEditable = await expect(page.locator('//input[@dataid="sh_email1"]')).not.toBeEditable()
        // console.log('The element is ', isEditable)
        // const emailInput = page.locator('[dataid="sh_email1"]');
        // await emailInput.click()
        await page.locator('[dataid="sh_email1"]').fill(TestData.email)

        //Enter password 
        await page.locator('#pass').fill(TestData.password)

        //Enter company 
        await page.locator('//input[@name="company"]').nth(0).fill(TestData.company)

        //Enter Mobile 
        await page.locator('//input[@name="mobile number"]').nth(0).fill(TestData.Mobile)

        //Enter Country 
        await page.locator('//label[text()="Country"]//child::input[@type="text"]').fill(TestData.Country)

        //Submit the information 
        await page.getByRole('button', { name: 'Submit' }).hover()
        await page.getByRole('button', { name: 'Submit' }).click()

    }
})
Then('I practice Dropdown, Disabled element',async function(){
  
    await page.goto('https://selectorshub.com/xpath-practice-page/')
    //To enable the input
    await page.locator('//label[contains(text(), "Can you enter name here through automation")]//child::*').first().click()
    await page.waitForTimeout(3000)

    //Firstname
    await page.locator('//input[@placeholder="First Enter name"]').fill(Sample1.firstname)
    await page.waitForTimeout(3000)

    //second name - disabled

    // Dropdown 1
    await page.getByRole('button',{name:'Checkout here'}).scrollIntoViewIfNeeded() 
    await page.getByRole('button',{name:'Checkout here'}).hover()
    await page.locator('//div[@class="dropdown-content"]//a[text()="SHub Youtube Channel"]').click()
    await page.bringToFront()
    await page.waitForTimeout(3000)

    // Dropdown 2
    await page.locator('#cars').selectOption(['Opel'])
    await page.waitForTimeout(2000)

    //Date 
    let todaysDate=new Date()
    let newDate=new Date(todaysDate)
    newDate.setDate(newDate.getDate()+300)
    let setDate = newDate.toLocaleDateString('sv-SE'); // yyyy-mm-dd
    await page.locator('//input[@type="date"]').fill(setDate)
    await page.waitForTimeout(5000)

    //Handle Window Alert
    await page.once('dialog',async(dialog)=>{
        await page.waitForTimeout(3000)
        await dialog.accept()
    })
    await page.locator('//button[text()="Click To Open Window Alert"]').scrollIntoViewIfNeeded()
    await page.locator('//button[text()="Click To Open Window Alert"]').click()

    //Handle Window Prompt ALert 
    page.once('dialog',async(dialog)=>{
        await page.waitForTimeout(3000)
        await dialog.accept('No,I dont have')
    })
    await page.locator('//button[text()="Click To Open Window Prompt Alert"]').click()
})

Then('I practice Popup Alert and Complex Element', async function () {
    page.once('dialog', async (dialog) => {
        console.log(`🎯 SUCCESS! Prompt caught. Text says: ${dialog.message()}`);
        await page.waitForTimeout(3000);
        await dialog.accept('It is success');
        await page.waitForTimeout(3000)
    });

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    await page.locator("//button[text()= 'Click for JS Prompt']").click()
    await page.waitForTimeout(3000)
})

Then('I practice Popup Alert and Complex Element1',async function(){
    //simple Alert
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.once('dialog',async(dialog)=>{
        await page.waitForTimeout(3000)
        await dialog.accept()
    })
    await page.locator('//button[text()="Simple Alert"]').click()
    await page.waitForTimeout(3000)

    //Confirmation Alert
    await page.once('dialog',async(dialog)=>{
        await page.waitForTimeout(3000)
        await dialog.dismiss()
    })
    await page.locator('//button[text()="Confirmation Alert"]').click()
    await page.waitForTimeout(3000)

    //Prompt Button 
    await page.once('dialog',async(dialog)=>{
        await page.waitForTimeout(3000)
        await dialog.accept('Harshitha')
    })
    await page.locator('//button[text()="Prompt Alert"]').click()
    await page.waitForTimeout(3000)
})

Then('Close the browser', async function () {
    await page.close()
})