const dotenv = require('dotenv')
const path = require('path')

dotenv.config()// setting the env variables

module.exports = {
    development: {
        client: process.env.DB_CLIENT || 'mysql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME || 'vollk'
        }
    },
    production: {
        client: process.env.DB_CLIENT || 'pg',
        connection: process.env.DB_URL || '',
    },
    local: {
        client: process.env.DB_CLIENT || 'sqlite3',
        connection: {
            filename: "./db.sqlite"
        }
    }
}