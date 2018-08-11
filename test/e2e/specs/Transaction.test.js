import expect from 'expect';
import moment from 'moment';

describe('Transaction', () => {
  let transaction;

  beforeEach(() => {
    // cy.clock(1532473578215);
    cy.server();
    cy.visit('/');
    cy.location().should((loc) => {
      expect(loc.hash).toBe('#/login');
    });
    cy.get('#email').type('davidcostadev@gmail.com');
    cy.get('#password').type('P@ssw0rd');
    cy.route('POST', /api\/v1\/login/i).as('login');
    cy.route('GET', /api\/v1\/transactions/i).as('getTransactions');
    cy.get('#login').submit();
    cy.wait('@login').then((xhr) => {
      expect(xhr.response.body.success).toBe(true);
    });
    cy.wait('@getTransactions').then((xhr) => {
      const transactions = xhr.response.body;

      expect(transactions).toHaveProperty('data');
      expect(transactions.data.length > 0).toBe(true);
    });
    cy.location().should((loc) => {
      expect(loc.hash).toBe('#/');
    });
  });

  it('add', () => {
    const date = moment();
    // cy.get('#tabs-type button:not(.md-active)').click();
    cy.get('a[href="#/transaction-new?type=out"]').click();
    cy.location().should((loc) => {
      expect(loc.hash).toBe('#/transaction-new?type=out');
    });
    cy.get('#name').type('Almoço');
    cy.get('#value').type('10');
    cy.get('#transactionDate input[type="text"]').clear();
    cy.get('#transactionDate input[type="text"]').type(`2018-${date.format('MM')}-01`, { force: true });

    cy.get('.md-dialog-actions .md-button:nth-child(2)').click();
    cy.wait(500);
    cy.get('#type').click({ force: true });

    cy.get('#type-out').click();

    cy.get('#account').click({ force: true });
    cy.get('#account-2').click();

    cy.get('#category').click({ force: true });
    cy.get('#category-1').click();

    cy.get('label[for="isPaid"]').click({ force: true });

    cy.route('POST', /api\/v1\/transactions/i).as('addTransaction');

    cy.get('#save').click({ force: true });

    cy.wait('@addTransaction').then((xhr) => {
      transaction = xhr.response.body;

      expect(transaction).toHaveProperty('id');
    });
    cy.wait(500);

    cy.location().should((loc) => {
      expect(loc.hash).toBe('#/?type=out');
    });
    cy.get('.md-snackbar-content span').contains('Transanção salva com sucesso!');
    cy.wait(500);
  });

  it('edit', () => {
    const date = moment();
    // cy.get('#tabs-type button:not(.md-active)').click();

    cy.route('GET', new RegExp(`/api/v1/transactions/${transaction.id}`, 'i')).as('getTransaction');
    cy.get(`#transaction-${transaction.id}`).click({ force: true });
    cy.wait('@getTransaction').then((xhr) => {
      expect(xhr.response.body).toHaveProperty('id');
      expect(xhr.response.body.id).toBe(transaction.id);
    });
    cy.location().should((loc) => {
      expect(loc.hash).toBe(`#/transactions/${transaction.id}`);
    });
    cy.get('#name').clear();
    cy.get('#name').type('Almoço 2');

    cy.get('#value').clear();
    cy.get('#value').type('15');
    cy.get('#transactionDate input[type="text"]').clear();
    cy.get('#transactionDate input[type="text"]').type(`2018-${date.format('MM')}-01`, { force: true });

    cy.get('.md-dialog-actions .md-button:nth-child(2)').click();
    cy.wait(500);
    cy.get('#type').click({ force: true });

    cy.get('#type-out').click();

    cy.get('#account').click({ force: true });
    cy.get('#account-1').click();

    cy.get('#category').click({ force: true });
    cy.get('#category-3').click();

    cy.get('label[for="isPaid"]').click({ force: true });

    cy.route('PUT', new RegExp(`/api/v1/transactions/${transaction.id}`, 'i')).as('updateTransaction');

    cy.get('#save').click({ force: true });

    cy.wait('@updateTransaction').then((xhr) => {
      transaction = xhr.response.body;

      expect(transaction).toHaveProperty('id');
    });
    cy.wait(500);

    cy.location().should((loc) => {
      expect(loc.hash).toBe('#/?type=out');
    });
    cy.get('.md-snackbar-content span').contains('Transanção salva com sucesso!');
    // cy.get('.md-snackbar .md-button.md-primary').click());
    cy.wait(500);
  });

  it('delete', () => {
    // cy.get('#tabs-type button:not(.md-active)').click();
    cy.route('GET', new RegExp(`/api/v1/transactions/${transaction.id}`, 'i')).as('getTransaction');
    cy.get(`#transaction-${transaction.id}`).click({ force: true });
    cy.wait('@getTransaction').then((xhr) => {
      expect(xhr.response.body).toHaveProperty('id');
      expect(xhr.response.body.id).toBe(transaction.id);
    });
    cy.location().should((loc) => {
      expect(loc.hash).toBe(`#/transactions/${transaction.id}`);
    });
    cy.get('#delete').click();
    cy.get('.md-dialog .md-button.md-primary').click();
    cy.get('.md-snackbar-content span').contains('Transação excluida com sucesso');
    cy.get('.md-snackbar .md-button.md-primary').click();
  });
});
