const cypress = require('cypress');
const server = require('../../server');

return cypress.run()
  .then((results) => server.close());
