Feature: Identification

  Scenario: Full name
    Given I am a registered user
    And I log in
    And I fill in the identification name section
    And I click next
    Then I should be in the identification othernames section
    Then I log out

  Scenario: Other names used
    Given I am a registered user
    And I log in
    And I fill in the identification othernames section
    And I click next
    Then I should be in the identification birthdate section
    Then I log out

  # Scenario: Birth date
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the identification birthdate section
  #   And I click next
  #   Then I should be in the identification birthplace section
  #   Then I log out

  # Scenario: Birth place
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the identification birthplace section
  #   And I click next
  #   Then I should be in the identification contacts section
  #   Then I log out

  # Scenario: Contacts
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the identification contacts section
  #   And I click next
  #   Then I should be in the identification ssn section
  #   Then I log out

  # Scenario: Social security number
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the identification ssn section
  #   And I click next
  #   Then I should be in the identification physical section
  #   Then I log out

  # Scenario: Physical attributes
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the identification physical section
  #   And I click next
  #   Then I should be in the identification review section
  #   Then I log out
