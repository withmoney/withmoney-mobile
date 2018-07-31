describe('Login', () => {

  it('with sucess', () => {
    cy.clock(1532473578215);
    cy.server()
    cy.visit('/');
    cy.get('#email').type('davidcostadev@gmail.com');
    cy.route(/api\/v1\/users/g).as('login');
    cy.get('#login').submit()
    cy.wait('@login');
    cy.contains('.md-toolbar .md-title', 'julho 18');
  });
});
