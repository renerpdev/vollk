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
    knex(table).del().then(() => {
        console.log('Table cleaned'.gray)
    })
}

//-- SEEDING

// function makeSeed(name) {
//     return new Promise((resolve, reject) => {
//         db.seed.make(name, knex_conf).then((resp, error) => {
//             if (error)
//                 reject(error)
//             else
//                 resolve(resp)
//         }).then(() => {
//             console.log('The seed file was created successfully!'.green)
//             close()
//         })
//     })
// }

function doSeeding(table, fields, types, lang, queries, clean_table) {
    console.log('Seeding the database...'.yellow)
    return new Promise((resolve, reject) => {
        _seeding(db, table, fields, types, lang, queries, clean_table).then((resp, error) => {
            if (error)
                reject(error)
            else
                resolve(resp)
        }).then(() => {
            console.log('success!'.green)
            close()
            utils.outputOptions({
                'table': table,
                'fields': fields,
                'fakers': types,
                'lang': lang,
                'queries': queries,
                'doClean': clean_table,
            })
        })
    })
}

function doSeedingJSON(json) {
    doSeeding(json.table, json.fields, json.fakers, json.lang, json.queries, json.doClean)
}

function _seeding(knex, table, fields, types, lang, queries, clean_table) {
    // Deletes ALL existing entries
    if (clean_table)
        cleanTable(table, knex)

    return knex(table)
        .then(function () {
            // Inserts seed entries
            var fb = []
            var myObject = {};
            for (var i = 0; i < queries; i++) {
                for (var j = 0; j < fields.length; j++) {
                    Object.defineProperty(myObject, fields[j], {
                        value: utils.buildFaker(types[j], lang),
                        writable: true,
                        configurable: true,
                        enumerable: true
                    });
                }
                fb[i] = myObject
                myObject = {};
            }
            return knex(table).insert(fb);
        });
};



// //-- MIGRATION

// function makeMigration(name) {
//     return new Promise((resolve, reject) => {
//         db.migrate.make(name, knex_conf).then((resp, error) => {
//             if (error)
//                 reject(error)
//             else
//                 resolve(resp)
//         }).then(() => {
//             console.log('The migration was created successfully!'.green)
//             close()
//         })
//     })
// }

// function doMigrations() {
//     return new Promise((resolve, reject) => {
//         console.log('Migrating database...'.yellow)
//         db.migrate.latest(knex_conf).then((resp, error) => {
//             if (error)
//                 reject(error)
//             else
//                 resolve(resp)
//         }).then(() => {
//             console.log('success!'.green)
//             close()
//         })
//     })
// }

//--

module.exports = { doSeeding, cleanTable, doSeedingJSON }
