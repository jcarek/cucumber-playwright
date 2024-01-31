@foo
Feature: Playwright docs

  Scenario: Change theme
    Given Go to the playwright website
    Given A cat fact is recieved
    When Change theme to "light" mode
    # And Screen matches the base image "Light Mode"
    Then We see "light" mode
    When Change theme to "dark" mode
# And Screen matches the base image "Dark Mode"

  Scenario: Block level 1
    Given Go to the email website
    And Email login page is opened
    Then Snapshot "login page"
    When Log in as test user
    Then Email inbox is opened
    Then Snapshot "Inbox"
    When Log out
    Then Email login page is opened
    Then Snapshot "Logged out"

  Scenario: Block level 2
    Given Go to the email website
    And Email login page is opened
    Then Snapshot "login page"
    When Log in as test user
    Then Email inbox is opened
    Then Snapshot "Inbox"
    When Log out
    Then Email login page is opened
    Then Write new email
