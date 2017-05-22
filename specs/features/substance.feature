Feature: Substance

  Scenario: Complete substance negative impact section
    Given I am a registered user
    And I log in
    And I fill in the substance alcohol/negative section
    And I click next
    Then I should be in the substance alcohol/ordered section
    Then I log out

  Scenario: Complete substance mandatory counseling or treatment section
    Given I am a registered user
    And I log in
    And I fill in the substance alcohol/ordered section
    And I click next
    Then I should be in the substance alcohol/voluntary section
    Then I log out

  Scenario: Complete substance voluntary counseling or treatment section
    Given I am a registered user
    And I log in
    And I fill in the substance alcohol/voluntary section
    And I click next
    Then I should be in the substance alcohol/additional section
    Then I log out

  Scenario: Complete substance additional instances section
    Given I am a registered user
    And I log in
    And I fill in the substance alcohol/additional section
    And I click next
    Then I should be in the substance review section
    Then I log out
