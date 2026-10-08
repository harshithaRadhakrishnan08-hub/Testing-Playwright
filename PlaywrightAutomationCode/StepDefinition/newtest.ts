import {Given,Then} from '@cucumber/cucumber'

import {Browser,chromium,Page} from 'playwright/test'

let browser:Browser,page:Page

let context

Given('Launch the CBrowser', async function () {
    browser=await chromium.launch({
        headless:false,
        args:['--start-maximized']
    })

    context=await browser.newContext({
        viewport:null
    })

    page=await context.newPage()

});

Then('I practice Iframe', async function () {
    await page.goto("https://selectorshub.com/iframe-scenario/")
    await page.waitForTimeout(3000)

    // await page.getByText('practice iframe and nested iframe scenarios').click()
    // await page.waitForTimeout(3000)

    //Single Iframe
    //Method1
    await page.frameLocator('#pact1').first().locator('#inp_val').fill('Jagan')
    await page.waitForTimeout(3000)

    //Method2
    const frame1=await page.frame({'url': 'https://selectorshub.com/iframe-and-nested-iframe/'})
    await frame1?.locator('#inp_val').type(' Sekar')
    await page.waitForTimeout(3000)

    //Child Iframe
    var Frames=page.frameLocator('#pact1').first().frameLocator('#pact2').first()
    await Frames.locator('#jex').nth(0).fill('Jaganathan Sekar')
    await page.waitForTimeout(3000)

    //Child of Child Iframe
    var Frames1=page.frameLocator('#pact1').first().frameLocator('#pact2').first().frameLocator('#pact3').first()
    await Frames1.locator('#glaf').nth(0).fill('Hello Heaven')
    await page.waitForTimeout(3000)

    //FramesCount 
    const ParentFrameLocator=page.frame({url: 'https://selectorshub.com/iframe-and-nested-iframe/'})
    console.log("*****************************************************")
    console.log('Total Frames',page.frames().length)

    //count ChildFrames --> only the immediate child frames will be counted, not the nested frames
    const childFrames=await  ParentFrameLocator?.childFrames() 
    if(childFrames!=null){
        for(let child of childFrames){
            console.log('ChildFrame URL:',child.url())
        }
    }else{
        console.log('No ChildFrames found')
    }
    const childFramesCount=childFrames?.length
    console.log('ChildFramesCount:',childFramesCount)
    console.log("*****************************************************")    
});    

Then('I practice Iframe1', async function () {
    await page.goto("https://demo.automationtesting.in/MultipleFrames.html")

//Method1
    const mainFrame1=page.frameLocator('//iframe[@src="SingleFrame.html"]')
    await mainFrame1.locator('//input[@type="text"]').fill('Happy Testing')
    await page.waitForTimeout(3000)

//Method2
    const mainFrame2=page.frame({url:'https://demo.automationtesting.in/SingleFrame.html'})
    mainFrame2?.locator('//input[@type="text"]').type(' and Happy Learning')
    await page.waitForTimeout(3000)   
});    

Then('I practice Iframe2', async function () {
    await page.goto("https://the-internet.herokuapp.com/nested_frames")
    const totalFrames=page.frames()
    const parentFrame=page.frame('https://the-internet.herokuapp.com/frame_top')
    const childFrames=parentFrame?.childFrames()
    console.log("******************************************************")
    console.log('Total Frames in Page:',totalFrames.length)
    console.log('Get URL of all Frames')
    for(let frame of totalFrames){
        console.log('Frame URL:',frame.url())
    }
    console.log('Total Child Frames',childFrames?.length)
    if(childFrames!=null){ 
        for(let child of childFrames){
            console.log('ChildFrame URL:',child.url())
        }
    } 
     console.log("******************************************************")   
});    
