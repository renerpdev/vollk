const inquirer = require('inquirer')
const db = require('./db')
const utils = require('./utils')
const color = require('colors')

const {
    field_questions,
    seed_questions,
    other_field_questions
} = require('./questions')

var prompt = inquirer.createPromptModule()
var choices = [
    'Create .env file here!',
    'Seed database',
    'Do last seeding',
    'Create a new seed',
]
var seed_opts = []
var fields = []
var types = []
var tables_array = []
var table
var queries = 10
var clean_table = false
var lang

//list
var table_props = [{
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
        choices[1],
        choices[2],
        choices[3],
        new inquirer.Separator(),
        choices[0],
    ]
}, ]

//------
function main() {
    prompt(table_props).then(answers => {
        if (answers.option == choices[0]) {
            create_env_file()
        } else if (answers.option == choices[1]) {
            seeding(true, true);
        } else if (answers.option == choices[2]) {
            loadOpts(utils.output_file)
        } else if (answers.option == choices[3]) {
            createSeed()
        }

    });
}

function create_env_file() {
    utils.create_env_file_async().then((res, err) => {
        if (err)
            console.log('Error occurs when trying to write the .env file'.red)
        else
            console.log('An empty .env file was created'.green)
    })

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

                var table_props = {
                    name: table,
                    fields: fields,
                    fakers: types,
                    lang: lang,
                    queries: queries,
                    doClean: clean_table,
                }
                tables_array.push(table_props)

                if (answers.add_table) { //if users wants to add more tables
                    seeding(persist, write)
                } else {
                    var json_options = {
                        tables: tables_array
                    }
                    db.doSeeding(json_options, persist, write)
                }
            })
        }
    });
}

async function loadOpts(path) {
    if (!path)
        path = 'output.json'
    utils.loadOptions(path, async function (err, out) {
        if (!err)
            await db.doSeedingJSON(out)
        else {
            console.log('File \'output.json\' not found!'.red)
            main()
        }
    })
}

function createSeed() {
    seeding(false, true)
}

module.exports = {
    main,
    seeding,
    loadOpts,
    createSeed,
    create_env_file,
    set_fields
}