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
                console.log(`Table `.gray + `${table.toUpperCase().yellow} ` + `cleaned`.gray)
                resolve()
            }
        })
    })
}

async function doSeeding(options, persist, write) {
    if (persist) {
        console.log('Seeding the database...'.yellow)
        var tables = options.tables
        for (var x = 0; x < tables.length; x++) {
          await  seedingAsync(tables[x]).then((resp, error) => {
                var t = tables[x]
                if (!error) {
                    console.log(`Seed table ${resp.toUpperCase()}: `.green + 'Succeeded!'.bgGreen)
                } else {
                    console.log(`Seed table ${resp.toUpperCase()}: `.red + 'Failed!'.bgRed)
                }
            })
        }
       await close()
    }
    await utils.output_options_async(options, write)
}

async function doSeedingJSON(options) {
    await doSeeding(options, true, false)
}


async function seedingAsync(options) {
    // Deletes ALL existing entries
    const knex = db
    var table = options.name

    if (options.doClean)
        await cleanTable(table, knex)

    // console.log(`Seeding table `.green + `${table.toUpperCase()}`)
    // Inserts seed entries
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
    return new Promise((resolve, reject) => {
        knex(table).insert(fb).then((res, err) => {
            if (err)
                reject('Error occurs when seeding'.red)
            else
                resolve(table)
        })
    })
};

//--

module.exports = {
    doSeeding,
    cleanTable,
    doSeedingJSON,
    seedingAsync
}