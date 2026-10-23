import { Then, When } from "@cucumber/cucumber";

import { request, expect } from '@playwright/test';

import * as dotenv from 'dotenv'

dotenv.config()

let response:any 

let token:any

When('I sent GET request', async function(){
    let baseURL=process.env.heroURL
    if (!baseURL) {
        throw new Error('heroURL is not defined in the environment')
    }
    let apiRequestContext=await request.newContext({
        baseURL:baseURL
    })
    response=await apiRequestContext.get(baseURL)
    
});

Then('Receive statuscode for GET request',async function(){
    console.log('The status code is ',response.status())
    console.log('The status is :')
    let responseBody = await response.json()
    console.log(responseBody)
    await expect(response.status()).toBe(200)
    
});

When('Create an Auth Token for POST and DELETE',async function(credentials){
    const baseURL="https://restful-booker.herokuapp.com/auth"
    let apiRequestContext=await request.newContext({
        baseURL:baseURL
    })
    response=await apiRequestContext.post(baseURL,{
        data:JSON.parse(credentials)
    })
    let responseBody=await response.json()
    token=responseBody.token
    console.log('The token is ',token)
    await expect(response.status()).toBe(200)
});

Then('I sent DELETE request using token',async function(){
    const baseURL="https://restful-booker.herokuapp.com/booking/119"
    let apiRequestContext=await request.newContext({
        baseURL:baseURL
    })
    response=await apiRequestContext.delete(baseURL,{
        headers:{
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        }

    })
})

Then('Receive statuscode for DELETE request',async function() {
    console.log('The status code for DELETE request is ',await response.status())
    await expect(response.status()).toBe(201)
    console.log('Response Body')
    console.log(await response.json())
})

Then('I sent POST request for creating new booking',async function(requestBody){
    const baseURL="https://restful-booker.herokuapp.com/booking"
    if(!baseURL){
        throw new Error('heroURL is not defined in the environment')    
    }
    const apiRequestContext=await request.newContext({
        baseURL:baseURL
    })

    response=await apiRequestContext.post(baseURL,{
        headers:{
           'Content-Type':'application/json',
           'Accept':'application/json' 
        },
        data: JSON.parse(requestBody)
    })

})

Then('Recieve statuscode for POST request',async function(){
    console.log('The status code for posting data in the request ',await response.status())
    console.log('Response Body')
    console.log(await response.json())
})

Then('I sent PUT request for Updating the Booking',async function(requestBody){
    const bookingID = '10'
    const baseURL=`https://restful-booker.herokuapp.com/booking/${bookingID}`
    const apiRequestContext=await request.newContext({
        baseURL:baseURL
    })
    response=await apiRequestContext.put(baseURL,{
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Cookie':`token=${token}`
        },
        data:JSON.parse(requestBody)
    })
})

Then('Receive statuscode for PUT request',async function(){
    console.log('The status code for updating data in the request ',await response.status())
    console.log('Response Body')
    console.log(await response.json())
})

Then('I sent PATCH request for partial update',async function(requestBody){
    const bookingId='31'
    const BaseURL=`https://restful-booker.herokuapp.com/booking/${bookingId}`
    const apiRequestContext=await request.newContext({
        baseURL:BaseURL
    })
    response=await apiRequestContext.patch(BaseURL,{
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Cookie': `token=${token}`
        },
        data:JSON.parse(requestBody)
    })
})

Then('Receive statuscode for PATCH request',async function(){
    console.log('The status code for partial updating data in the request ',await response.status())
    console.log('Response Body')
    console.log(await response.json())
})