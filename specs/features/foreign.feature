Feature: Foreign

  Scenario: Complete the U.S. Passport subsection
    Given I am a registered user
    And I log in
    And I fill in the foreign passport section
    And I click next
    Then I should be in the foreign review section
    Then I log out
