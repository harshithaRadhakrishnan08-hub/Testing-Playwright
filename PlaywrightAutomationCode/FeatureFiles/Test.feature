## Launch an Application 

Feature: Launch two applications parallely

  Scenario: Launch an application
    Given Launch the Browser
    Then Launch the facebook app
    Then Close the app


  Scenario: Launch a different application
  Given Launch the Browser
    Then Launch the twitter app
    Then Close the app