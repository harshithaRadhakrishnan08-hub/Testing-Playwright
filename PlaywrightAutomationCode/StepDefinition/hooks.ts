//import hook annotations from cucumber
import {BeforeAll, AfterAll, Before, After} from '@cucumber/cucumber'   
//import Browser, Context and Page for Playwright automation    
import {Browser,chromium,Page,BrowserContext,} from '@playwright/test'
//import pageFixture object from pageFixture.ts file
import {pageFixture} from '../hooks/pageFixture'
//import path and process modules from Node.js to handle file paths and process information
import path from 'path'
import process from 'process'

let browser:Browser, page:Page, context:BrowserContext

BeforeAll(async function () {
//Initilaize the browswer    
    browser = await chromium.launch({ 
        headless:false,
        args:["--start-maximized"]
    })
});

Before(async function () {
    // Context - one session on the window - record video of test execution  
    // Page - one tab on the window
    context =await browser.newContext({
        recordVideo: { dir:'test-result/videos'},
        viewport:null
    })
    // Create a new page in the context and assign it to the pageFixture object
    page = await context.newPage()
    pageFixture.page = page

    //Tracing the test execution and capturing screenshots for debugging purposes
    await context.tracing.start({
        screenshots:true,
        snapshots:true,
        sources:true
    })
});

After(async function(scenario){
    //Stop tracing and save the trace file to the specified directory
    const traceName=scenario.pickle.name.replace(/[^a-zA-Z0-9]/g,'_')
    const tracePath=path.join(process.cwd(),`Reports/trace/${traceName}.zip`)
    await context.tracing.stop({path:tracePath})
});

AfterAll(async function(){
    //close the contexts and the browser

    await browser.close()
})
