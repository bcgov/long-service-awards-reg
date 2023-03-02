/// <reference types="cypress" />
const url = Cypress.env("url");
import { getRegistration, postRegistration } from "../helpers/registrations";

describe("Initializes Registration", () => {
  //have to build in api call to create registration
  context("SelfRegister", () => {
    beforeEach(() => {
      // cy.visit("http://localhost:5173/");
      // getRegistration("0-registration-blank");

      cy.visit(`${url}register/self`, {
        timeout: 50000,
      });
    });

    it("redirects a new user to the first self-registration page", () => {
      Cypress.$("document").ready(function () {
        // cy.wait(["@getRegistrations", "@getSingleRegistration"]);
        cy.location("pathname").should("include", "profile");
      });
    });

    it("prevents submission with incorrect info", () => {
      cy.location("pathname").should("include", "profile");
    });

    it("submits registration", () => {
      cy.location("pathname").should("include", "profile");
    });
  });
});
