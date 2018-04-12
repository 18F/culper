Feature: Military

  Scenario: I log in to the form
    Given I am a registered user
    And I log in

  Scenario: I navigate to the Military history intro section
    And I navigate to the military intro section
    And I click Next to go to military selective
    Then I should be in the military selective section

  Scenario: Complete selective service record
    #And I fill in the military selective section
    And I click Next to go to military history
    Then I should be in the military history section

  Scenario: Complete military history
    #And I fill in the military history section
    And I click Next to go to military foreign
    Then I should be in the military foreign section

  Scenario: Complete foreign military
    #And I fill in the military foreign section
    And I click Next to go to military review
    Then I should be in the military review section

  Scenario: Log out of the form
    Then I log out
