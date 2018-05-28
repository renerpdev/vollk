const dotenv = require('dotenv')

dotenv.config()// setting the env variables

module.exports = {
    development: {
        client: process.env.DATABASE_DRIVER,
        connection: {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.DATABASE_NAME
        },
        migrations: {
            tableName: 'migrations',
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    production: {}
}