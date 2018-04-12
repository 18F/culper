Feature: Financial

  Scenario: Log in to the form
    Given I am a registered user
    And I log in

  Scenario: Navigate to the Financial record section
    And I navigate to the financial intro section
    And I click Next to go to financial bankruptcy
    Then I should be in the financial bankruptcy section

  Scenario: Complete the Bankruptcy subsection
    #And I fill in the financial bankruptcy section
    And I click Next to go to financial gambling
    Then I should be in the financial gambling section

  Scenario: Complete the Gambling subsection
    #And I fill in the financial gambling section
    And I click Next to go to financial taxes
    Then I should be in the financial taxes section

  Scenario: Complete the Taxes subsection
    #And I fill in the financial taxes section
    And I click Next to go to financial card
    Then I should be in the financial card section

  Scenario: Complete the Card subsection
    #And I fill in the financial card section
    And I click Next to go to financial credit
    Then I should be in the financial credit section

  Scenario: Complete the Credit subsection
    #And I fill in the financial credit section
    And I click Next to go to financial delinquent
    Then I should be in the financial delinquent section

  Scenario: Complete the Delinquent subsection
    #And I fill in the financial delinquent section
    And I click Next to go to financial nonpayment
    Then I should be in the financial nonpayment section

  Scenario: Complete the Nonpayment subsection
    #And I fill in the financial nonpayment section
    And I click Next to go to financial review
    Then I should be in the financial review section

  Scenario: Log out of the form
    Then I log out
