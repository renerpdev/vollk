const inquirer = require('inquirer')
const { doSeeding, doSeedingJSON } = require('./db')
const utils = require('./utils')
const color = require('colors')

const
    { field_questions, seed_questions, other_field_questions }
        = require('./questions')

var prompt = inquirer.createPromptModule()
var choices = [
    'Set connection',
    'Seed database',
    'Do last seeding',
    'Create a new seed',

]
var seed_opts = []
var fields = []
var types = []
var table
var queries = 10
var clean_table = false
var lang

//list
var options = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            choices[1],
            choices[2],
            choices[3],
            // new inquirer.Separator(),
            // choices[0],
        ]
    },]

//------
function main() {
    prompt(options).then(answers => {
        if (answers.option == choices[1]) {
            seeding(true, true);
        } else if (answers.option == choices[2]) {
            loadOpts(utils.output_file)
        }
        else if (answers.option == choices[3]) {
            createSeed()
        }
    });
}

function seeding(persist, write) {
    prompt(seed_questions).then(answers => {
        table = answers.table_name
        set_fields(persist, write)
    });
}

function set_fields(persist, write) {
    prompt(field_questions).then(answers => {
        fields.push(answers.field_name)
        types.push(answers.field_type + '.' + answers.type_faker)
        if (answers.again) {
            set_fields(persist, write);
        } else {
            prompt(other_field_questions).then(answers => {
                //do seeding here
                queries = answers.queries
                clean_table = answers.clean_table
                lang = answers.lang
                doSeeding(table, fields, types, lang, queries, clean_table, persist, write)
            })
        }
    });
}

function loadOpts(path) {
    utils.loadOptions(path, function (err, out) {
        if (!err)
            doSeedingJSON(out)
        else {
            console.log('File \'output.json\' not found!'.red)
            main()
        }
    })

}

function createSeed() {
    seeding(false, true)
}

function setConnection() {

}

module.exports = { main, seeding, loadOpts, createSeed }