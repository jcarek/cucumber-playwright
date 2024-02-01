@email_test
Feature: Email test

  Scenario: Block level 1
    Given Go to the email website
    And Email login page is opened
    And Snapshot "login page"
    When Log in as test user
    Then Email inbox is opened
    And Snapshot "Inbox"
    When Log out
    Then Email login page is opened

  Scenario: Block level 2
    Given Go to the email website
    And Email login page is opened
    And Snapshot "login page"
    When Log in as test user
    Then Email inbox is opened
    And Snapshot "Inbox"
    When Click write new email button
    Then New email page is visible
    And Snapshot "New mail"
    When Fill in email
    And Snapshot "Filled in"
    And Send email
    Then Email is received
    And Snapshot "Received"
    When Log out
    Then Email login page is opened
