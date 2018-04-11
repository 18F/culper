Feature: Relationships

  Scenario: Log in to the form
    Given I am a registered user
    And I log in

  Scenario: Navigate to the relationships section
    And I navigate to the relationships intro section
    And I click Next to go to relationships status/marital
    Then I should be in the relationships status/marital section

  Scenario: Complete the marital status subsection
    And I fill in the relationships status/marital section
    And I click Next to go to relationships status/cohabitant
    Then I should be in the relationships status/cohabitant section

  Scenario: Complete the relationships status cohabitant subsection
    And I fill in the relationships status/cohabitant section
    And I click Next to go to relationships people
    Then I should be in the relationships people section

  Scenario: Complete the relationships people subsection
    And I fill in the relationships people section
    And I click Next to go to relationships relatives
    Then I should be in the relationships relatives section

  Scenario: Complete the relationships relatives subsection
    And I fill in the relationships relatives section
    And I click Next to go to relationships review
    Then I should be in the relationships review section

  Scenario: Log out of the form
    Then I log out
