Feature: Substance

  Scenario: Complete drugs usage section
    Given I am a registered user
    And I log in
    And I fill in the substance drugs/usage section
    And I click next
    Then I should be in the substance drugs/purchase section
    Then I log out

  Scenario: Complete drugs purchase section
    Given I am a registered user
    And I log in
    And I fill in the substance drugs/purchase section
    And I click next
    Then I should be in the substance drugs/clearance section
    Then I log out

  Scenario: Complete drugs security clearance position section
    Given I am a registered user
    And I log in
    And I fill in the substance drugs/clearance section
    And I click next
    Then I should be in the substance drugs/publicsafety section
    Then I log out

  Scenario: Complete drugs public safety position section
    Given I am a registered user
    And I log in
    And I fill in the substance drugs/publicsafety section
    And I click next
    Then I should be in the substance drugs/misuse section
    Then I log out

  Scenario: Complete drugs misuse section
    Given I am a registered user
    And I log in
    And I fill in the substance drugs/misuse section
    And I click next
    Then I should be in the substance drugs/ordered section
    Then I log out

  Scenario: Complete mandatory counseling or treatment
    Given I am a registered user
    And I log in
    And I fill in the substance drugs/ordered section
    And I click next
    Then I should be in the substance drugs/voluntary section
    Then I log out

  Scenario: Complete voluntary counseling or treatment
    Given I am a registered user
    And I log in
    And I fill in the substance drugs/voluntary section
    And I click next
    Then I should be in the substance alcohol/negative section
    Then I log out

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
