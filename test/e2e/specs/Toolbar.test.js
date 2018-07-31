describe('Toolbar', () => {
  it('navigation', () => {
    cy.clock(1532473578215);
    cy.server()
    cy.visit('/');
    cy.get('#email').type('davidcostadev@gmail.com');
    cy.get('#password').type('P@ssw0rd');
    cy.route('POST', /api\/v1\/login/i).as('login');
    cy.get('#login').submit()
    cy.wait('@login');

    cy.get('#btn-previus-month').click();

    cy.contains('.md-toolbar .md-title', 'junho 18');

    cy.get('#btn-next-month').click();
    cy.get('#btn-next-month').click();

    cy.contains('.md-toolbar .md-title', 'agosto 18');
  });
});
