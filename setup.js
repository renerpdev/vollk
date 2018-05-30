'use strict';
const colors = require('colors');
const fs = require('fs');
const data = `MODE='production'

DB_CLIENT=
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=127.0.0.1
DB_PORT=
DB_URL=
SQLITE_PATH=
`

fs.writeFile('.env', data, null, (err) => {
    if (err)
        console.log('Error occurs when trying to write the .env file'.red)
    else
        console.log('An empty .env file was created'.green)
})