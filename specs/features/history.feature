Feature: History

  Scenario: Complete the Where you have lived subsection
    Given I am a registered user
    And I log in
    And I fill in the history residence section
    And I click next
    Then I should be in the history employment section
    Then I log out

  Scenario: Complete the Employment Activities subsection
    Given I am a registered user
    And I log in
    And I fill in the history employment section
    And I click next
    Then I should be in the history education section
    Then I log out

  Scenario: Complete the Where you went to school subsection
    Given I am a registered user
    And I log in
    And I fill in the history education section
    And I click next
    Then I should be in the history federal section
    Then I log out

  Scenario: Complete the Former federal service subsection
    Given I am a registered user
    And I log in
    And I fill in the history federal section
    And I click next
    Then I should be in the history review section
    Then I log out
