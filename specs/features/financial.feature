Feature: Financial

  # Scenario: Complete the Bankruptcy subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the financial bankruptcy section
  #   And I click next
  #   Then I should be in the financial gambling section
  #   Then I log out
  #
  # Scenario: Complete the Gambling subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the financial gambling section
  #   And I click next
  #   Then I should be in the financial taxes section
  #   Then I log out
  #
  # Scenario: Complete the Taxes subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the financial taxes section
  #   And I click next
  #   Then I should be in the financial card section
  #   Then I log out
  #
  # Scenario: Complete the Card subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the financial card section
  #   And I click next
  #   Then I should be in the financial credit section
  #   Then I log out
  #
  # Scenario: Complete the Credit subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the financial credit section
  #   And I click next
  #   Then I should be in the financial delinquent section
  #   Then I log out

  Scenario: Complete the Delinquent subsection
    Given I am a registered user
    And I log in
    And I fill in the financial delinquent section
    And I click next
    Then I should be in the financial nonpayment section
    Then I log out
