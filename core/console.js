const inquirer = require('inquirer')
const { doSeeding, doSeedingJSON } = require('./db')
const utils = require('./utils')
const color = require('colors')

var { Observable } = require('rxjs');
const
    { field_questions, seed_questions, other_field_questions }
        = require('./questions')

var prompt = inquirer.createPromptModule()
var choices = [
    'Set connection',
    'Seed database',
    'Do last seeding',
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
            new inquirer.Separator(),
            choices[0],
        ]
    },]

//------
function main() {
    prompt(options).then(answers => {
        if (answers.option == choices[1]) {
            seeding();
        } else if (answers.option == choices[2]) {
            loadOpts(utils.output_file)
        }
    });
}

function seeding() {
    prompt(seed_questions).then(answers => {
        table = answers.table_name
        set_fields()
    });
}

function set_fields() {
    prompt(field_questions).then(answers => {
        fields.push(answers.field_name)
        types.push(answers.field_type + '.' + answers.type_faker)
        if (answers.again) {
            set_fields();
        } else {
            prompt(other_field_questions).then(answers => {
                //do seeding here
                queries = answers.queries
                clean_table = answers.clean_table
                lang = answers.lang
                doSeeding(table, fields, types, lang, queries, clean_table)
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

module.exports = { main, seeding, loadOpts }