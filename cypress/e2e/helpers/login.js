const url = Cypress.env("url");
const infoURL = "/admin/users/info";
const loginURL = "/admin/users/login";
const settingsURL = "/tables/settings";
const userFixtures = "user-info/user-states/";
const eventSettingsFixture = "user-info/eventsettings.json";
//Default stub logs in as super-administrator for testing

const getLogin = (loginFile) => {
  const loginID = loginFile
    ? `${userFixtures}${loginFile}`
    : `${userFixtures}super-administrator`;
  const infoID = loginFile
    ? `${userFixtures}${loginFile}-info`
    : `${userFixtures}super-administrator-info`;

  cy.intercept("GET", infoURL, {
    fixture: infoID,
  }).as("inituser");

  cy.intercept("GET", loginURL, {
    fixture: loginID,
  }).as("getLogin");

  cy.intercept("GET", settingsURL, {
    fixture: eventSettingsFixture,
  }).as("getSettings");

  cy.visit(url, { timeout: 50000 });

  cy.wait(["@inituser", "@getLogin", "@getSettings"]);
};

const getCustomLogin = (loginFile) => {
  const loginID = loginFile
    ? `${userFixtures}${loginFile}`
    : `${userFixtures}super-administrator`;
  const infoID = loginFile
    ? `${userFixtures}${loginFile}-info`
    : `${userFixtures}super-administrator-info`;

  cy.intercept("GET", infoURL, {
    fixture: infoID,
  }).as("inituser");

  cy.intercept("GET", loginURL, {
    fixture: loginID,
  }).as("getLogin");

  cy.intercept("GET", settingsURL, {
    fixture: eventSettingsFixture,
  }).as("getSettings");
};

module.exports = { getLogin, getCustomLogin };
