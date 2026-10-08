Feature: Complete Automation Practice
#Background: 
#        Given Launch the Chrome Browser
@xpathAxes
  Scenario: Practice Ralative axes  
        When  I open the Automation practice page
        Then Practice locators
        And Close the browser

@Locators 
  Scenario: Practice Locators
        When I open the Automation practice page
        Then I practice locators
        And Close the browser

@Table 
  Scenario: Practice Table
        When I open the Automation practice page 
        Then I practice table in static way
        Then I practice table in dynamic way 
        Then I practice calender in static way
        Then I practice calender in dynamic way 
        And Close the browser

@screenshot 
  Scenario: ScreenShot elements, pages and full page
        When  I open the Automation practice page 
       # Then I take screenshots
       # Then I practice pagination Table
        Then I practice shadow DOM in ATP
        And Close the browser

@selectorHub
  Scenario: Practice SelectorsHub Page
        When I open the Shadow DOM practice page
        Then I practice shadow DOM 
        Then I practice dummy form with direct input
        Then I practice dummy form with input from JSON file
        Then I practice Dropdown, Disabled element
        And Close the browser

@Alerts
  Scenario: Practice Alerts accross different websites
        Then I practice Popup Alert and Complex Element
        Then I practice Popup Alert and Complex Element1
        And Close the browser

@iframe
  Scenario: Practice Iframe accross different websites
        Then I practice Iframe
        Then I practice Iframe1
        Then I practice Iframe2
        And Close the browser

@WindowsHandling
  Scenario: Practice Windows Handling
        Given Open the Browser with more pages
        Then I open browser stack page
        Then I practice Windows Handling
        And Close the pages, context and browser        