'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

const dotent = require('dotenv')

dotent.config()
console.log(process.env)
module.exports = merge(devEnv, {
  NODE_ENV: '"testingaaaa"',
  MYMONEY_API: `"${process.env.MYMONEY_API}"`,
})
