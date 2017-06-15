Feature: Financial

  # Scenario: Complete the Bankruptcy subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the financial bankruptcy section
  #   And I click next
  #   Then I should be in the financial gambling section
  #   Then I log out

  Scenario: Complete the Gambling subsection
    Given I am a registered user
    And I log in
    And I fill in the financial gambling section
    And I click next
    Then I should be in the financial taxes section
    Then I log out
