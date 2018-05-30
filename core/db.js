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

function doSeeding(table, fields, types, lang, queries, clean_table, persist, write) {
    var options = {
        'table': table,
        'fields': fields,
        'fakers': types,
        'lang': lang,
        'queries': queries,
        'doClean': clean_table,
    }
    if (persist) {
        console.log('Seeding the database...'.yellow)
        _seeding(db, table, fields, types, lang, queries, clean_table).then((resp, error) => {
            if (!error) {
                console.log('SUCCESS!'.green)
            } else {
                console.log('error!')
            }
            close()
        })
    }
    utils.outputOptions(options, write)
}

function doSeedingJSON(json) {
    doSeeding(json.table, json.fields, json.fakers, json.lang, json.queries, json.doClean, true, false)
}

function _seeding(knex, table, fields, types, lang, queries, clean_table) {
    // Deletes ALL existing entries
    if (clean_table)
        cleanTable(table, knex)

    return knex(table)
        .then(function (resp, err) {
            // Inserts seed entries
            if (err) {
                return
            }
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

//--

module.exports = { doSeeding, cleanTable, doSeedingJSON }
