'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

const dotent = require('dotenv')

dotent.config()

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  MYMONEY_API: `"${process.env.MYMONEY_API}"`,
})
