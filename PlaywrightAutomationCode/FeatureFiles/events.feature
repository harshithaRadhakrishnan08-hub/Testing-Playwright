Feature: Authentication and Security Guardrails

@events
  Scenario: Successful login preserves session across page reloads
    Given I am on the EventHub login page
    When I enter valid login credentials 
    Then I should be redirected to the events dashboard page
    When I reload the active browser webpage window

@events
  Scenario: Unauthenticated users are blocked from viewing dashboards
    Given I clear all session cookies and local storage tokens
    When I direct-navigate to the "/events" dashboard URL
    Then I should be automatically intercepted and redirected to the "/login" page
