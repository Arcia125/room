beforeEach(() => {
  // cy.wrap prevents the code from hanging on the first run
  cy.wrap(() =>
    cy.exec('npm run resetDb', { failOnNonZeroExit: false }).then(console.log)
  );
});

describe('login', () => {
  it('allows user to enter username and go to dashboard', () => {
    cy.visit('/')
      .get('input')
      .type('banana')
      .get('.form__button')
      .click();
    cy.findByText(/Dashboard/i);
    // options that should be available
    cy.findByText(/Logout/i)
      .findAllByText(/Create A Room/i)
      .findByText(/My Account/i);
  });
});
