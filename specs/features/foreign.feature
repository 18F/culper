Feature: Foreign

  Scenario: Log in to the form
    Given I am a registered user
    And I log in

  Scenario: Navigate to the Foreign associations section
    And I navigate to the foreign intro section
    And I click Next to go to foreign passport
    Then I should be in the foreign passport section

  Scenario: Complete the Foreign Passport section
    And I fill in the foreign passport section
    And I click Next to go to foreign contacts
    Then I should be in the foreign contacts section

  Scenario: Complete the foreign business contact section
    And I fill in the foreign contacts section
    And I click Next to go to foreign activities
    Then I should be in the foreign activities section

  Scenario: Complete the foreign activities direct control section
    And I fill in the foreign activities section direct subsection
    And I click Next to go to foreign activities/indirect
    Then I should be in the foreign activities/indirect section

  Scenario: Complete the foreign activities indirect control section
    And I fill in the foreign activities section indirect subsection
    And I click Next to go to foreign activities/realestate
    Then I should be in the foreign activities/realestate section

  Scenario: Complete the foreign activities real estate purchase section
    And I fill in the foreign activities section realestate subsection
    And I click Next to go to foreign activities/benefits
    Then I should be in the foreign activities/benefits section

  Scenario: Complete the foreign activities benefits section
    And I fill in the foreign activities section benefits subsection
    And I click Next to go to foreign activities/support
    Then I should be in the foreign activities/support section

  Scenario: Complete the foreign activities support section
    And I fill in the foreign activities section support subsection
    And I click Next to go to foreign business/advice
    Then I should be in the foreign business/advice section

  Scenario: Complete the foreign business advice section
    And I fill in the foreign business section advice subsection
    And I click Next to go to foreign business/family
    Then I should be in the foreign business/family section

  Scenario: Complete the foreign business family advice section
    And I fill in the foreign business section family subsection
    And I click Next to go to foreign business/employment
    Then I should be in the foreign business/employment section

  Scenario: Complete the foreign business employment offers section
    And I fill in the foreign business section employment subsection
    And I click Next to go to foreign business/ventures
    Then I should be in the foreign business/ventures section

  Scenario: Complete the foreign business other ventures section
    And I fill in the foreign business section ventures subsection
    And I click Next to go to foreign business/conferences
    Then I should be in the foreign business/conferences section

  Scenario: Complete the foreign business conferences section
    And I fill in the foreign business section conferences subsection
    And I click Next to go to foreign business/contact
    Then I should be in the foreign business/contact section

  Scenario: Complete the foreign business family contact section
    And I fill in the foreign business section contact subsection
    And I click Next to go to foreign business/sponsorship
    Then I should be in the foreign business/sponsorship section

  Scenario: Complete the foreign business sponsorship section
    And I fill in the foreign business section sponsorship subsection
    And I click Next to go to foreign business/political
    Then I should be in the foreign business/political section

  Scenario: Complete the foreign business political section
    And I fill in the foreign business section political subsection
    And I click Next to go to foreign business/voting
    Then I should be in the foreign business/voting section

  Scenario: Complete the foreign business voting section
    And I fill in the foreign business section voting subsection
    And I click Next to go to foreign travel
    Then I should be in the foreign travel section

  Scenario: Complete the foreign travel section
    And I fill in the foreign travel section
    And I click Next to go to foreign review
    Then I should be in the foreign review section

  Scenario: Log out of the form
    # click save??
    Then I log out
