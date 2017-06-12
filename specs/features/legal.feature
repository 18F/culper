Feature: Legal

  Scenario: Complete police record
    Given I am a registered user
    And I log in
    And I fill in the legal police section
    And I click next
    Then I should be in the legal investigations/history section
    Then I log out

  Scenario: Complete the legal investigations history section
    Given I am a registered user
    And I log in
    And I fill in the legal investigations/history section
    And I click next
    Then I should be in the legal investigations/revoked section
    Then I log out

  Scenario: Complete the legal investigations revoked section
    Given I am a registered user
    And I log in
    And I fill in the legal investigations/revoked section
    And I click next
    Then I should be in the legal investigations/debarred section
    Then I log out

  Scenario: Complete the legal investigations debarred section
    Given I am a registered user
    And I log in
    And I fill in the legal investigations/debarred section
    And I click next
    Then I should be in the legal court section
    Then I log out

  Scenario: Complete the non-criminal court actions section
    Given I am a registered user
    And I log in
    And I fill in the legal court section
    And I click next
    Then I should be in the legal technology/unauthorized section
    Then I log out

  Scenario: Complete the legal technology unauthorized access section
    Given I am a registered user
    And I log in
    And I fill in the legal technology/unauthorized section
    And I click next
    Then I should be in the legal technology/manipulating section
    Then I log out

  Scenario: Complete the legal technology manipulating access section
    Given I am a registered user
    And I log in
    And I fill in the legal technology/manipulating section
    And I click next
    Then I should be in the legal technology/unlawful section
    Then I log out

  Scenario: Complete the legal technology unlawful use section
    Given I am a registered user
    And I log in
    And I fill in the legal technology/unlawful section
    And I click next
    Then I should be in the legal associations section
    Then I log out

  Scenario: Complete the legal associations to terrorist organizations section
    Given I am a registered user
    And I log in
    And I fill in the legal associations/terrorist-organization section
    And I click next
    Then I should be in the legal associations/engaged-in-terrorism section
    Then I log out

  Scenario: Complete the legal associations engaged in terrorism section
    Given I am a registered user
    And I log in
    And I fill in the legal associations/engaged-in-terrorism section
    And I click next
    Then I should be in the legal associations/advocating section
    Then I log out

  Scenario: Complete the legal associations advocating terrorism section
    Given I am a registered user
    And I log in
    And I fill in the legal associations/advocating section
    And I click next
    Then I should be in the legal associations/membership-overthrow section
    Then I log out

  Scenario: Complete the legal associations memberships to overthrow section
    Given I am a registered user
    And I log in
    And I fill in the legal associations/membership-overthrow section
    And I click next
    Then I should be in the legal associations/membership-violence section
    Then I log out

  Scenario: Complete the legal associations membership promoting violence section
    Given I am a registered user
    And I log in
    And I fill in the legal associations/membership-violence-or-force section
    And I click next
    Then I should be in the legal associations/activities-to-overthrow section
    Then I log out

  Scenario: Complete the legal associations activities to overthrow section
    Given I am a registered user
    And I log in
    And I fill in the legal associations/activities-to-overthrow section
    And I click next
    Then I should be in the legal associations/terrorism-association section
    Then I log out

  Scenario: Complete the legal associations to terrorism section
    Given I am a registered user
    And I log in
    And I fill in the legal associations/terrorism-association section
    And I click next
    Then I should be in the legal review section
    Then I log out
