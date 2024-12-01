Feature: Show specific item

Scenario: User will enter in the Item details page
    Given that the application is running with items in database
    When the user queries a specific Item
    Then the system should output the retrieved item