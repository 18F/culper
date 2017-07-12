Feature: Relationships

  # Scenario: Complete the marital status subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the relationships status/marital section
  #   And I click next
  #   Then I should be in the relationships status/cohabitant section
  #   Then I log out

  Scenario: Complete the relationships status cohabitant subsection
    Given I am a registered user
    And I log in
    And I fill in the relationships status/cohabitant section
    And I click next
    Then I should be in the relationships people section
    Then I log out
