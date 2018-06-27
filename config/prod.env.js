'use strict'
const dotent = require('dotenv')

dotent.config()

module.exports = {
  NODE_ENV: '"production"',
  MYMONEY_API: `"${process.env.MYMONEY_API}"`,
}
