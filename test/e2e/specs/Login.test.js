describe('Login', () => {

  it('with sucess', () => {
    cy.clock(1532473578215);
    cy.server()
    cy.visit('/');
    cy.get('#email').type('davidcostadev@gmail.com');
    cy.get('#password').type('P@ssw0rd');
    cy.route(/api\/v1\/auth/g).as('login');
    cy.get('#login').submit()
    cy.wait('@login');
    cy.contains('.md-toolbar .md-title', 'julho 18');
  });
});
