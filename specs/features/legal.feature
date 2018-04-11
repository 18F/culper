Feature: Legal

  Scenario: Log in to the form
    Given I am a registered user
    And I log in

  Scenario: Navigate to the Investigative and criminal history section
    And I navigate to the legal intro section
    And I click Next to go to legal police/intro
    Then I should be in the legal police/intro section

  Scenario: Complete police record introduction
    And I click Next to go to legal police/offenses
    Then I should be in the legal police/offenses section

  Scenario: Complete police offenses
    #And I fill in the legal police section offenses subsection
    And I click Next to go to legal police/additionaloffenses
    Then I should be in the legal police/additionaloffenses section

  Scenario: Complete police additional offenses
    #And I fill in the legal police section additionaloffenses subsection
    And I click Next to go to legal police/domesticviolence
    Then I should be in the legal police/domesticviolence section

  Scenario: Complete police domestic violence
    #And I fill in the legal police section domesticviolence subsection
    And I click Next to go to legal investigations/history
    Then I should be in the legal investigations/history section

  Scenario: Complete the legal investigations history section
    #And I fill in the legal investigations section history subsection
    And I click Next to go to legal investigations/revoked
    Then I should be in the legal investigations/revoked section

  Scenario: Complete the legal investigations revoked section
    #And I fill in the legal investigations section revoked subsection
    And I click Next to go to legal investigations/debarred
    Then I should be in the legal investigations/debarred section

  Scenario: Complete the legal investigations debarred section
    #And I fill in the legal investigations section debarred subsection
    And I click Next to go to legal court
    Then I should be in the legal court section

  Scenario: Complete the non-criminal court actions section
    #And I fill in the legal court section
    And I click Next to go to legal technology/unauthorized
    Then I should be in the legal technology/unauthorized section

  Scenario: Complete the legal technology unauthorized access section
    #And I fill in the legal technology section unauthorized subsection
    And I click Next to go to legal technology/manipulating
    Then I should be in the legal technology/manipulating section

  Scenario: Complete the legal technology manipulating access section
    #And I fill in the legal technology section manipulating subsection
    And I click Next to go to legal technology/unlawful
    Then I should be in the legal technology/unlawful section

  Scenario: Complete the legal technology unlawful use section
    #And I fill in the legal technology section unlawful subsection
    And I click Next to go to legal associations
    Then I should be in the legal associations section

  Scenario: Complete the legal associations to terrorist organizations section
    #And I fill in the legal associations section terrorist-organization subsection
    And I click Next to go to legal associations/engaged-in-terrorism
    Then I should be in the legal associations/engaged-in-terrorism section

  Scenario: Complete the legal associations engaged in terrorism section
    #And I fill in the legal associations section engaged-in-terrorism subsection
    And I click Next to go to legal associations/advocating
    Then I should be in the legal associations/advocating section

  Scenario: Complete the legal associations advocating terrorism section
    #And I fill in the legal associations section advocating subsection
    And I click Next to go to legal associations/membership-overthrow
    Then I should be in the legal associations/membership-overthrow section

  Scenario: Complete the legal associations memberships to overthrow section
    #And I fill in the legal associations section membership-overthrow subsection
    And I click Next to go to legal associations/membership-violence
    Then I should be in the legal associations/membership-violence section

  Scenario: Complete the legal associations membership promoting violence section
    #And I fill in the legal associations section membership-violence-or-force subsection
    And I click Next to go to legal associations/activities-to-overthrow
    Then I should be in the legal associations/activities-to-overthrow section

  Scenario: Complete the legal associations activities to overthrow section
    #And I fill in the legal associations section activities-to-overthrow subsection
    And I click Next to go to legal associations/terrorism-association
    Then I should be in the legal associations/terrorism-association section

  Scenario: Complete the legal associations to terrorism section
    #And I fill in the legal associations section terrorism-association subsection
    And I click Next to go to legal legal review
    Then I should be in the legal review section

  Scenario: Log out of the form
    Then I log out
