
## Launch an Application 

Feature: Data entry form automation

@testautomation
  Scenario: Launch AutomationPractice
    Given Launch the Chromium Browser
    When Launch the test automation practice
    Then Fill the data form 
    And Close the app

@testfeature
    Scenario: Launch and close the Browser
    Given Launch the browser
  Then   Close the broswer


@practiceautomation 
  Scenario Outline: Practice automation locators
    Given Launch the Browser
    When Open the page
    Then practice locators
    And Close the app 

