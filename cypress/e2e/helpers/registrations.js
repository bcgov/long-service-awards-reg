//Default stub pulls in origin registrations
const registrationsURL = "/register";
const registrationsFixtures = "responses/";

const getRegistration = (file) => {
  const registrationSingleUrl = `${registrationsURL}/*`;
  const registrationList = file
    ? `${registrationsFixtures}${file}`
    : `${registrationsFixtures}0-registration-blank`;

  cy.intercept("GET", registrationSingleUrl, {
    fixture: registrationList,
  }).as("getRegistration");
};

const postRegistration = (file) => {
  const registrationSingleUrl = `${registrationsURL}/*`;
  const registrationList = file
    ? `${registrationsFixtures}${file}`
    : `${registrationsFixtures}0-registration-blank`;

  cy.intercept("POST", registrationSingleUrl, {
    fixture: registrationList,
  }).as("postRegistration");
};

export default {
  getRegistration,
  postRegistration,
};
