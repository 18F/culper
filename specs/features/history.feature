Feature: History

  Scenario: Complete the Where you have lived subsection
    Given I am a registered user
    And I log in
    And I fill in the history residence section
    And I click next
    Then I should be in the history employment section
    Then I log out
