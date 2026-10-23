Feature: Database Validation
Background: 
Given Connect to the database

@Database
Scenario: SELECT the data 
When I fetched the data using SELECT query 
Then Receive the rows and perform assertion

@Database
Scenario: INSERT the data
When I insert new rows to the data using INSERT query
Then Assert the insert

@Database
Scenario: UPDATE the row
When Modify data using UPDATE query
Then Assert the update success

@Database
Scenario: DELETE a row
When Delete an entire row using DELETE query
Then Assert the delete status 