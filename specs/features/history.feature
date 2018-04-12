Feature: History

  Scenario: I log in to the form
    Given I am a registered user
    And I log in

  Scenario: I navigate to the Your history intro section
    And I navigate to the history intro section
    And I click Next to go to history residence
    Then I should be in the history residence section

  Scenario: Complete the Where you have lived subsection
    # And I fill in the history residence section
    And I click Next to go to history employment
    Then I should be in the history employment section

  Scenario: Complete the Employment Activities subsection
    And I fill in the history employment section
    # And I click Next to go to history education
    # Then I should be in the history education section

  # Scenario: Complete the Where you went to school subsection
    # And I fill in the history education section
    # And I click Next to go to history federal
    # Then I should be in the history federal section

  # Scenario: Complete the Former federal service subsection
  #   # And I fill in the history federal section
  #   And I click Next to go to history review
  #   Then I should be in the history review section

  Scenario: Log out of the form
    Then I log out
