const {
    _langs,
    _types,
    _fakers
} = require('./utils')

//--
var seed_questions = [{
    type: 'input',
    name: 'table_name',
    message: 'Table name:',
    validate: function (value) {
        var pass = value.match(
            /[a-z]/gi
        );
        if (pass) {
            return true;
        }

        return 'Set a valid table name'
    }
}, ]
var field_questions = [{
        type: 'input',
        name: 'field_name',
        message: 'Name of field:',
        validate: function (value) {
            var pass = value.match(
                /[a-z]/gi
            );
            if (pass) {
                return true;
            }

            return 'Set a valid field name'
        }
    },
    {
        type: 'list',
        name: 'field_type',
        message: 'Choose a type',
        choices: function () {
            var t = _types
            var arr = []
            for (var i = 0; i < t.length; i++) {
                arr.push(t[i].name)
            }
            return arr
        }
    },
    {
        type: 'list',
        name: 'type_faker',
        message: 'Choose the type faker',
        choices: function (answer) {
            var t = _types
            for (var i = 0; i < t.length; i++) {
                if (t[i].name == answer.field_type)
                    return t[i].fakers
            }
        }
    },
    {
        type: 'confirm',
        name: 'again',
        message: 'Do you want to add another field?',
    }
]

var other_field_questions = [{
        type: 'list',
        name: 'lang',
        message: 'Select the faker language:',
        choices: _langs
    },
    {
        type: 'confirm',
        name: 'clean_table',
        message: 'Do you want to clean this table?',
        default: false
    },
    {
        type: 'input',
        name: 'queries',
        message: 'Amount of queries:',
        validate: function (value) {
            var pass = value.match(
                /[\d]/gi
            );
            if (pass) {
                return true;
            }

            return 'Set a valid number'
        }
    },
    {
        type: 'confirm',
        name: 'add_table',
        message: 'Do you want to add more tables?',
        default: false
    },
]


module.exports = {
    field_questions,
    seed_questions,
    other_field_questions
}