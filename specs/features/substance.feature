Feature: Substance

  Scenario: Log in to the form
    Given I am a registered user
    And I log in

  Scenario: Navigate to the Substance use section
    And I navigate to the substance intro section
    And I click Next to go to substance drugs/usage
    Then I should be in the substance drugs/usage section

  Scenario: Complete drugs usage section
    #And I fill in the substance drugs section usage subsection
    And I click Next to go to substance drugs/purchase
    Then I should be in the substance drugs/purchase section

  Scenario: Complete drugs purchase section
    #And I fill in the substance drugs section purchase subsection
    And I click Next to go to substance drugs/clearance
    Then I should be in the substance drugs/clearance section

  Scenario: Complete drugs security clearance position section
    #And I fill in the substance drugs section clearance subsection
    And I click Next to go to substance drugs/publicsafety
    Then I should be in the substance drugs/publicsafety section

  Scenario: Complete drugs public safety position section
    #And I fill in the substance drugs section publicsafety subsection
    And I click Next to go to substance drugs/misuse
    Then I should be in the substance drugs/misuse section

  Scenario: Complete drugs misuse section
    #And I fill in the substance drugs section misuse subsection
    And I click Next to go to substance drugs/ordered
    Then I should be in the substance drugs/ordered section

  Scenario: Complete mandatory counseling or treatment
    #And I fill in the substance drugs section ordered subsection
    And I click Next to go to substance drugs/voluntary
    Then I should be in the substance drugs/voluntary section

  Scenario: Complete voluntary counseling or treatment
    #And I fill in the substance drugs section voluntary subsection
    And I click Next to go to substance alcohol/negative
    Then I should be in the substance alcohol/negative section

  Scenario: Complete substance negative impact section
    #And I fill in the substance alcohol section negative subsection
    And I click Next to go to substance alcohol/ordered
    Then I should be in the substance alcohol/ordered section

  Scenario: Complete substance mandatory counseling or treatment section
    #And I fill in the substance alcohol section ordered subsection
    And I click Next to go to substance alcohol/voluntary
    Then I should be in the substance alcohol/voluntary section

  Scenario: Complete substance voluntary counseling or treatment section
    #And I fill in the substance alcohol section voluntary subsection
    And I click Next to go to substance alcohol/additional
    Then I should be in the substance alcohol/additional section

  Scenario: Complete substance additional instances section
    #And I fill in the substance alcohol section additional subsection
    And I click Next to go to substance review section
    Then I should be in the substance review section

  Scenario: Log out of the form
    Then I log out
