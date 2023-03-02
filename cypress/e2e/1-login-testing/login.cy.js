import { getLogin } from "../helpers/login";

//Complete when api integrated

describe("Login Process", () => {
  context("login on page entry", () => {
    it("logs the user in on the main page", () => {
      getLogin("initial-user");

      cy.fixture("requests/login-info").then((users) => {
        const { user1 } = users;
        cy.contains(`${user1["username"]}`);
      });
    });
  });
});
