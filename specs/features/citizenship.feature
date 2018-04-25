Feature: Citizenship

  Scenario: Log in to the form
    Given I am a registered user
    And I log in

  Scenario: Navigate to the citizenship section
    And I navigate to the citizenship intro section
    And I click Next to go to citizenship status
    Then I should be in the citizenship status section

  Scenario: Complete the citizenship status subsection
    And I fill in the citizenship status section
    And I click Next to go to citizenship multiple
    Then I should be in the citizenship multiple section

  Scenario: Complete the dual multiple citizenship status subsection
    And I fill in the citizenship multiple section
    And I click Next to go to citizenship passports
    Then I should be in the citizenship passports section

  Scenario: Complete the citizenship passports subsection
    And I fill in the citizenship passports section
    And I click Next to go to citizenship review
    Then I should be in the citizenship review section

  Scenario: Log out of the form
    Then I log out
