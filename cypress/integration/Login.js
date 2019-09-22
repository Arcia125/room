import "@testing-library/cypress/add-commands";

describe("login", () => {
  it("allows user to enter username and go to dashboard", () => {
    cy.visit("http://localhost:3000")
      .get("input")
      .type("banana")
      .get(".sc-bwzfXH")
      .click();

    throw new Error("This test should fail right now!");

    // Assert here, maybe something like
    // cy.getByText('Dashboard')
    // cy.getByText('Logout')
    // cy.getByText('Create Room')
  });
});
