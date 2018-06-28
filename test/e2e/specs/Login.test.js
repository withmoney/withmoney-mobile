// https://docs.cypress.io/api/introduction/api.html

describe('Login', () => {
  it('with sucess', () => {
    cy.server()
    cy.visit('/');
    cy.get('#email').type('davidcostadev@gmail.com');
    cy.route(/api\/v1\/users/g).as('login');
    cy.get('#login').submit()
    cy.wait('@login');
    cy.contains('.md-title', 'Junho');
  });
});
