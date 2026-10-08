Feature: Swag 

Scenario:   Open swag and Enter login details 
    Given Open the browser
    When Launch the Swag broswer
    Then Enter Username and password
    Then Verify Username and password for all users
    And Close the browser

#Feature: SwagLabs Shopping Flow

@swagtabs
Scenario: Cross-Tab Session Synchronization Verification 
    Given I launch the browser for multiple pages
    When Launch the Swag broswer
    Then I login with valid credentials

@swag
  Scenario: Add product to cart and verify count
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

@swag1
  Scenario: Remove product from cart
    Given I add "Sauce Labs Backpack" to the cart
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty

@swag1
  Scenario: Complete checkout
    Given I add "Sauce Labs Backpack" to the cart
    When I proceed to checkout
    And I fill in checkout details "John" "Doe" "12345"
    Then I should see the order confirmation