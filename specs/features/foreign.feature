Feature: Foreign

  Scenario: Complete the U.S. Passport subsection
    Given I am a registered user
    And I log in
    And I fill in the foreign passport section
    And I click next
    Then I should be in the foreign contacts section
    Then I log out

  Scenario: Complete the foreign business voting section
    Given I am a registered user
    And I log in
    And I fill in the foreign business/voting section
    And I click next
    Then I should be in the foreign travel section
    Then I log out

  Scenario: Complete the foreign travel section
    Given I am a registered user
    And I log in
    And I fill in the foreign travel section
    And I click next
    Then I should be in the foreign review section
    Then I log out
