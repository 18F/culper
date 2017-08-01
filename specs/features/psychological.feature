Feature: Psychological

  # Scenario: Complete the Psychological competence subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the psychological competence section
  #   And I click Next to go to psychological consultations
  #   Then I should be in the psychological consultations section
  #   Then I log out

  Scenario: Complete the Psychological consultations subsection
    Given I am a registered user
    And I log in
    And I fill in the psychological consultations section
    And I click Next to go to psychological hospitalizations
    Then I should be in the psychological hospitalizations section
    Then I log out
