Feature: Foreign

  # Scenario: Complete the U.S. Passport subsection
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the foreign passport section
  #   And I click Next to go to foreign contacts
  #   Then I should be in the foreign contacts section
  #   Then I log out

  # Scenario: Complete the foreign business contact section
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the foreign contacts section
  #   And I click Next to go to foreign activities
  #   Then I should be in the foreign activities section
  #   Then I log out

  # Scenario: Complete the foreign activities direct control section
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the foreign activities section direct subsection
  #   And I click Next to go to foreign activities/indirect
  #   Then I should be in the foreign activities/indirect section
  #   Then I log out

  # Scenario: Complete the foreign activities indirect control section
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the foreign activities section indirect subsection
  #   And I click Next to go to foreign activities/realestate
  #   Then I should be in the foreign activities/realestate section
  #   Then I log out

  Scenario: Complete the foreign activities real estate purchase section
    Given I am a registered user
    And I log in
    And I fill in the foreign activities section realestate subsection
    And I click Next to go to foreign activities/benefits
    Then I should be in the foreign activities/benefits section
    Then I log out

  # Scenario: Complete the foreign business sponsorship section
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the foreign business section sponsorship subsection
  #   And I click Next to go to foreign business/political
  #   Then I should be in the foreign business/political section
  #   Then I log out
  #
  # Scenario: Complete the foreign business political section
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the foreign business/political section
  #   And I click Next to go to foreign business/voting
  #   Then I should be in the foreign business/voting section
  #   Then I log out
  #
  # Scenario: Complete the foreign business voting section
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the foreign business/voting section
  #   And I click Next to go to foreign travel
  #   Then I should be in the foreign travel section
  #   Then I log out
  #
  # Scenario: Complete the foreign travel section
  #   Given I am a registered user
  #   And I log in
  #   And I fill in the foreign travel section
  #   And I click Next to go to foreign review
  #   Then I should be in the foreign review section
  #   Then I log out
