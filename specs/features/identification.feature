Feature: Identification

  Scenario: Log in to the form
    Given I am a registered user
    And I log in

  Scenario: Navigate to the Indentification section
    And I click Next to go to identification name
    Then I should be in the identification name section

  Scenario: Full name
    And I fill in the identification name section
    And I click Next to go to identification othernames
    Then I should be in the identification othernames section

  Scenario: Other names used
    And I fill in the identification othernames section
    And I click Next to go to identification contacts
    Then I should be in the identification contacts section

  Scenario: Contacts
    And I fill in the identification contacts section
    And I click Next to go to identification birthdate
    Then I should be in the identification birthdate section

  Scenario: Birth date
    And I fill in the identification birthdate section
    And I click Next to go to identification birthplace
    Then I should be in the identification birthplace section

  Scenario: Birth place
    And I fill in the identification birthplace section
    And I click Next to go to identification ssn
    Then I should be in the identification ssn section

  Scenario: Social security number
    And I fill in the identification ssn section
    And I click Next to go to identification physical
    Then I should be in the identification physical section

  Scenario: Physical attributes
    And I fill in the identification physical section
    And I click Next to go to identification review
    Then I should be in the identification review section

  Scenario: Review Section
    Then I should see my data in the name section data
    Then I should see my data in the othernames section data
    Then I should see my data in the contacts section data
    Then I should see my data in the birthdate section data
    Then I should see my data in the birthplace section data
    Then I should see my data in the ssn section data
    Then I should see my data in the physical section data
    Then I should have no errors

  Scenario: Log out of the form
    Then I log out
