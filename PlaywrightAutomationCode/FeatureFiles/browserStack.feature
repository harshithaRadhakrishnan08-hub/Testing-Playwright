Feature:  Browser Stack Testing
Background:
    Given Open the Browser for testing
    When Open the Browser Stack webpage

@browserstack1
Scenario Outline:  Product Grid Filtering & UI Sorting 
        Then Get the product list 
        And Close the testing browser

@browserstack2
Scenario Outline: Form Handling, Login Security Roles & Error State Validation
        Then Check the invalid configuration 
        Then Refresh and enter the valid login details 
         And Close the testing browser

@BrowserStack3
Scenario Outline: : Real-Time Drawer Modal & Client Checkout Pipelines 
        Then Login as "demouser" 
        Then Add an item "iPhone 12" to cart
        Then Enter the Order details "<First Name>","<Last Name>","<Address>","<State>","<Postal Code>" 
        And Close the testing browser 
   Examples:
       | First Name | Last Name | Address | State | Postal Code |
       | Harshitha  | Krishnan | 10016 65th st  | WI | 53142 | 

@BrowserStack4
Scenario Outline: Cross-Tab Session Synchronization Verification 
       Then create another page2 and open the homepage "https://bstackdemo.com/"
       Then Login as "demouser"
       Then Add an item "iPhone 12" to cart
       Then Switch to page2 and verify wehther the item is added to the cart 
       And Close the testing browser
