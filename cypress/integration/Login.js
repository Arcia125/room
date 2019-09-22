describe("login", () => {
  it("allows user to type a username", () => {
    cy.visit("http://localhost:3000")
      .get("input")
      .type("banana")
      .get(".sc-bwzfXH")
      .click();
  });
});
