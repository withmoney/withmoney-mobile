const cypress = require('cypress');
const server = require('../../server');

cypress.run()
  .then((results) => server.close());
