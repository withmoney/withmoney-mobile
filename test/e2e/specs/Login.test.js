// https://docs.cypress.io/api/introduction/api.html

describe('Login', () => {
  it('with sucess', () => {
    cy.visit('/');
    cy.get('#email').type('davidcostadev@gmail.com');
    cy.get('#login').submit();
    cy.contains('.md-title', 'Junho');
  });
});
