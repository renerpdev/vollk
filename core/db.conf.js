const knex_conf = require('./../knexfile')
const knex = require('knex')
// const path = require('path')
const dotenv = require('dotenv')

dotenv.config()// setting the env variables

const environment = process.env.MODE || 'production'
const db = knex(knex_conf[environment])// configuring knex with the env variables

module.exports = db