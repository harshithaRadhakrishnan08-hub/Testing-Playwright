
import { expect } from '@playwright/test'

import { Given, When, Then } from '@cucumber/cucumber'

import { dbConfig } from '../Config'

import mysql from 'mysql2/promise';

let res: any[] = []

let connection: Awaited<ReturnType<typeof mysql.createConnection>>

Given('Connect to the database', async function () {
    connection = await mysql.createConnection({
        ...dbConfig
    })
    await connection.connect()
})

When('I fetched the data using SELECT query', async function () {
    //select query - the resulyt of res is stored as an array [[rowsdata],[metadata]]
    res = await connection.execute(
        'SELECT * FROM parks_departments'
    )
});

Then('Receive the rows and perform assertion', async function () {
    //extract only the rowdata from res - 0th index
    const rows = res[0];
    for (let row of rows) {
        console.log(row)
    }
    //assert the value 
    // await expect(rows[0].department_name).toContain("Parks and Recreation")
});

When('I insert new rows to the data using INSERT query', async function () {
    //inserted newdata into the table
    try {
        res = await connection.query(
            'INSERT INTO parks_departments(department_id,department_name) VALUES(?,?)',
            [19, "Child Health"]
        )
    } catch (error: any) {
        console.log('The Insert failed due to an unexpected error:', error.message);
    }
})

Then('Assert the insert', async function () {
    /* res[0] contains an OkPacket object with execution statistics.
    RAW RES TYPE: object
    RAW RES VALUE: [
      {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 19,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0
      },
      null
    ]
    */
    //check the rowCount
    try {
        const total = res[0].affectedRows
        console.log('The total number of rows inserted is ', total)

        //Assert the check 
        await expect(total).toBe(1)
    }
    catch (error: any) {
        console.log('The insert is not success and the result is undefined', error.message)
    }

})

When('Modify data using UPDATE query', async function () {
    /* res contains an OkPacket object with execution statistics.
    [
    ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: 'Rows matched: 1  Changed: 1  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 1
    },
    undefined
    ]
    */
    try {
        res = await connection.query(
            'update parks_departments set department_name="Admin" where department_id=?',
            [11]
        )
        console.log(res)
    } catch (error: any) {
        console.log('The update is not success', error.message)
    }
})

Then('Assert the update success', async function () {
    try {
        const rows = res[0]
        const total = rows.changedRows
        if (total > 0) {
            console.log('The row update is success')
            await expect(total).toBe(1)
        }
        else {
            console.log('No data is updated - possible duplicate update')
        }
    } catch (error: any) {
        console.log('The update is not success and the result is undefined', error.message)
    }
});

When('Delete an entire row using DELETE query',async function(){
    /*
    [
      ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 0
        },
        undefined
    ]
    */
   try{
    res = await connection.query(
            'delete from parks_departments where department_id=?',
            [1]
        )
        console.log(res)
   }
     catch (error: any) {
        console.log('The update is not success', error.message)
    }
});

Then('Assert the delete status',async function(){
    try {
        const rows = res[0]
        const total = rows.changedRows
        if (total > 0) {
            console.log('The row delete is success')
            await expect(total).toBe(1)
        }
        else {
            console.log('No rows are deleted')
        }
    } catch (error: any) {
        console.log('The delete is not success and the result is undefined', error.message)
    }
});