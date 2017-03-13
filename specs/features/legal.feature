Feature: Legal

  Scenario: Complete police record
    Given I am a registered user
    And I log in
    And I fill in the legal police section
    And I click next
    Then I should be in the legal review section
    Then I log out
