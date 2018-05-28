const knex_conf = require('./../knexfile')
const knex = require('knex')
// const path = require('path')
const dotenv = require('dotenv')

dotenv.config()// setting the env variables

const environment = process.env.ENVIRONMENT || 'development'
const db = knex(knex_conf[environment])// configuring the knex with the env varibles

module.exports = db