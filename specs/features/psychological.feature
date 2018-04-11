Feature: Psychological

  Scenario: I log in to the form
    Given I am a registered user
    And I log in

  Scenario: I navigate to the Psychological and emotional health intro section
    And I navigate to the psychological intro section
    And I click Next to go to psychological competence
    Then I should be in the psychological competence section

  Scenario: Complete the Psychological competence subsection
    #And I fill in the psychological competence section
    And I click Next to go to psychological consultations
    Then I should be in the psychological consultations section

  Scenario: Complete the Psychological consultations subsection
    #And I fill in the psychological consultations section
    And I click Next to go to psychological hospitalizations
    Then I should be in the psychological hospitalizations section

  Scenario: Complete the Psychological hospitalizations subsection
    #And I fill in the psychological hospitalizations section
    And I click Next to go to psychological diagnoses
    Then I should be in the psychological diagnoses section

  Scenario: Complete the Psychological diagnoses subsection
    #And I fill in the psychological diagnoses section
    And I click Next to go to psychological review
    Then I should be in the psychological review section

  Scenario: Log out of the form
    Then I log out
