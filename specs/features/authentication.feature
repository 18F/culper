Feature: Authentication
  To gain access to the protected form of the site a user should
  be able to sign in

  Scenario: User authenticates with basic authentication
    Given my username is "spec01" and my password is "password01"
    When I go to the login page
    And sign in
#    Then I should be presented with a request for two factor authentication
#    And provide my token
    Then I should be presented with the introduction
    Then I should be presented with the form
    Then I log out
