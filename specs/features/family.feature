Feature: Family

  Scenario: Complete relatives
    Given I am a registered user
    And I log in
    And I fill in the family relatives section
    And I click next
    Then I should be in the family review section
    Then I log out
