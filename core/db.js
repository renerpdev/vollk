const knex_conf = require('./../knexfile')
const db = require('./db.conf')
const colors = require('colors');
const utils = require('./utils');
const path = require('path');

function close() {
    db.destroy().then(() => {
        // console.log('Connection closed'.inverse)
    })
}

function cleanTable(table, knex) {
    return new Promise((resolve, reject) => {
        knex(table).del().then((res, err) => {
            if (err)
                reject()
            else {
                console.log('Table cleaned'.gray)
                resolve()
            }
        })
    })
}

async function doSeeding(options, persist, write) {
    if (persist) {
        console.log('Seeding the database...'.yellow)
        seedingAsync(options).then((resp, error) => {
            if (!error) {
                console.log('Operation '.green + 'succeeded!'.bgGreen)
            } else {
                console.log('Operation '.red + 'Failed!'.bgRed)
            }
            close()
        })
    }
    await utils.output_options_async(options, write)
}

async function doSeedingJSON(options) {
    await doSeeding(options, true, false)
}


async function seedingAsync(options) {
    // Deletes ALL existing entries
    const knex = db

    if (options.doClean)
        await cleanTable(options.table, knex)

    return knex(options.table)
        .then(function (resp, err) {
            // Inserts seed entries
            if (err) {
                return
            }
            var fb = []
            var myObject = {};
            var fields = options.fields
            var types = options.fakers
            for (var i = 0; i < options.queries; i++) {
                for (var j = 0; j < fields.length; j++) {
                    Object.defineProperty(myObject, fields[j], {
                        value: utils.buildFaker(types[j], options.lang),
                        writable: true,
                        configurable: true,
                        enumerable: true
                    });
                }
                fb[i] = myObject
                myObject = {};
            }
            return knex(options.table).insert(fb);
        });
};

//--

module.exports = { doSeeding, cleanTable, doSeedingJSON, seedingAsync }
