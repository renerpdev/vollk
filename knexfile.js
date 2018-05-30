const dotenv = require('dotenv')
const path = require('path')

dotenv.config()// setting the env variables

module.exports = {
    development: {
        client: process.env.DB_CLIENT || 'sqlite3',
        connection: {
            filename: process.env.SQLITE_PATH || path.resolve('db.sqlite')
        }
    },
    production: {
        client: process.env.DB_CLIENT || 'mysql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME || 'vollk'
        },
        // migrations: {
        //     tableName: 'migrations',
        //     directory: __dirname + '/db/migrations',
        // },
        // seeds: {
        //     directory: __dirname + '/db/seeds'
        // }
    }
}