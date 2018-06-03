const fs = require('fs')
const path = require('path')

const output_file = 'output.json'
const settings_file = 'settings.json'

var _types = [{
        name: 'lorem',
        fakers: [
            'word',
            'sentence',
            'slug',
            'sentences',
            'paragraph',
            'paragraphs',
            'lines',
        ],
    },
    {
        name: 'name',
        fakers: [
            'firstName',
            'lastName',
            'findName',
            'jobTitle',
            'prefix',
            'suffix',
            'title',
            'jobDescriptor',
            'jobArea',
            'jobType',
        ],
    },
    {
        name: 'address',
        fakers: [
            'zipCode',
            'city',
            'cityPrefix',
            'citySuffix',
            'streetName',
            'streetAddress',
            'streetSuffix',
            'streetPrefix',
            'secondaryAddress',
            'county',
            'country',
            'countryCode',
            'state',
            'stateAbbr',
            'latitude',
            'longitude',
        ],
    },
    {
        name: 'internet',
        fakers: [
            'avatar',
            'email',
            'exampleEmail',
            'userName',
            'protocol',
            'url',
            'domainName',
            'domainSuffix',
            'domainWord',
            'ip',
            'ipv6',
            'userAgent',
            'color',
            'mac',
            'password',
        ],
    },
    {
        name: 'commerce',
        fakers: [
            'color',
            'department',
            'productName',
            'price',
            'productAdjective',
            'productMaterial',
            'product',
        ],
    },
    {
        name: 'phone',
        fakers: [
            'phoneNumber',
            'phoneNumberFormat',
        ],
    },
    {
        name: 'date',
        fakers: [
            'past',
            'future',
            'between',
            'recent',
            'month',
            'weekday',
        ],
    },
    {
        name: 'random',
        fakers: [
            'number',
            'arrayElement',
            'objectElement',
            'uuid',
            'boolean',
            'word',
            'words',
            'image',
            'locale',
            'alphaNumeric',
        ],
    },
    {
        name: 'system',
        fakers: [
            'fileName',
            'commonFileName',
            'mimeType',
            'commonFileType',
            'commonFileExt',
            'fileType',
            'fileExt',
            'semver',
        ],
    },
    {
        name: 'image',
        fakers: [
            'image',
            'avatar',
            'imageUrl',
            'abstract',
            'animals',
            'business',
            'cats',
            'city',
            'food',
            'nightlife',
            'fashion',
            'people',
            'nature',
            'sports',
            'technics',
            'transport',
            'dataUri',
        ],
    },
    {
        name: 'finance',
        fakers: [
            'account',
            'accountName',
            'mask',
            'amount',
            'transactionType',
            'currencyCode',
            'currencyName',
            'currencySymbol',
            'bitcoinAddress',
            'iban',
            'bic',
        ],
    },
    {
        name: 'company',
        fakers: [
            'suffixes',
            'companyName',
            'companySuffix',
            'catchPhrase',
            'bs',
            'catchPhraseAdjective',
            'catchPhraseDescriptor',
            'catchPhraseNoun',
            'bsAdjective',
            'bsBuzz',
            'bsNoun',
        ]
    }
]

var _langs = [
    'az',
    'cz',
    'de',
    'de_AT',
    'de_CH',
    'en',
    'en_AU',
    'en_BORK',
    'en_CA',
    'en_GB',
    'en_IE',
    'en_IND',
    'en_US',
    'en_au_ocker',
    'es',
    'es_MX',
    'fa',
    'fr',
    'fr_CA',
    'ge',
    'id_ID',
    'it',
    'ja',
    'ko',
    'nb_NO',
    'nep',
    'nl',
    'pl',
    'pt_BR',
    'ru',
    'sk',
    'sv',
    'tr',
    'uk',
    'vi',
    'zh_CN',
    'zh_TW',
]

//--
function buildFaker(str, lang) {
    const faker = require('faker')
    faker.locale = lang;
    return faker.fake('{{' + str + '}}')
}

async function output_options_async(opts, w) {
    const json = await JSON.stringify(opts, null, '  ');
    if (w) {
        console.log(json.bgWhite.blue);
        return write(json, 'output.json')
    }
    return
}

function create_env_file_async(data) {
    var mdata = data
    if (!data) {
        mdata = `MODE='development'

DB_CLIENT=
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=127.0.0.1

DB_URL=

SQLITE_PATH=
    `
    }
    return new Promise(async (resolve, reject) => {
        await fs.writeFile('.env', mdata, null, (err) => {
            if (err)
                reject(err)
            else
                resolve()
        })
    })
}

function write(obj, p) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(p), obj, null, function (err, data) {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

function loadSettings(path) {
    if (path)
        settings_file = path

    console.log('file:  '.bgMagenta + settings_file)
    return new Promise((resolve, reject) => {
        loadOptions(settings_file, function (err, res) {
            if (err)
                reject(err)
            else
                resolve(res)
        })
    })
}

function loadOptions(path, callback) {
    fs.readFile(path, function (err, data) {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, JSON.parse(data))
    })
}

function readFileAsync(path) {
    return new Promise((res, rej) => {
        fs.readFile(path, function (err, data) {
            if (err) {
                rej('Can not found the file')
            }
            res(data)
        })
    })

}

//If the file exists return true otherwise false
function exists_file(path) {
    return new Promise((resolve) => {
        fs.exists(path, (exists) => {
            if (exists)
                resolve(true)
            resolve(false)
        })
    })
}

//remove the file from that path
function remove_file(path) {
    return new Promise((resolve) => {
        fs.unlink(path, (err) => {
            if (err)
                resolve(false)
            resolve(true)
        })
    })
}


module.exports = {
    _langs,
    _types,
    buildFaker,
    create_env_file_async,
    loadOptions,
    output_file,
    settings_file,
    loadSettings,
    output_options_async,
    exists_file,
    remove_file,
    readFileAsync
}