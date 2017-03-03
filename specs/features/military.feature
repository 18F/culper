Feature: Military

  Scenario: Complete selective service record
    Given I am a registered user
    And I log in
    And I fill in the military selective section
    And I click next
    Then I should be in the military history section
    Then I log out

  Scenario: Complete military history
    Given I am a registered user
    And I log in
    And I fill in the military history section
    And I click next
    Then I should be in the military disciplinary section
    Then I log out

  Scenario: Complete disciplinary procedures
    Given I am a registered user
    And I log in
    And I fill in the military disciplinary section
    And I click next
    Then I should be in the military foreign section
    Then I log out
