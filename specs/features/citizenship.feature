Feature: Citizenship

  # Scenario: Complete the citizenship status subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the citizenship status section
  #   And I click Next Dual/multiple citizenship
  #   Then I should be in the citizenship multiple section
  #   Then I log out

  Scenario: Complete the dual multiple citizenship status subsection
    Given I am a registered user
    And I log in
    And I fill in the citizenship multiple section
    And I click Next Foreign passports
    Then I should be in the citizenship passports section
    Then I log out
