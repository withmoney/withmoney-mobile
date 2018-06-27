'use strict'
const merge = require('webpack-merge')
const dotent = require('dotenv')
const prodEnv = require('./prod.env')

dotent.config()

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MYMONEY_API: `"${process.env.MYMONEY_API}"`,
})
