Feature: Manage Items from Restaurant

Scenario: Consult items from a specific Item Category
    Given that the application is running with items in database
    When the user queries a specific Item Category
    Then the system should output items from the Category selected by the user