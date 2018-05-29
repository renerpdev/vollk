const fs = require('fs')
const path = require('path')

const output_file = 'output.json'
const settings_file = 'settings.json'

var _types = [
    {
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

function outputOptions(opts, w) {
    const json = JSON.stringify(opts, null, '  ');
    if (w) {
        write(json, 'output.json').then((res, err) => {
            if (!err)
                console.log(json.bgWhite.blue);
        })
    }
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

function loadSettings() {
    return new Promise((resolve, reject) => {
        loadOptions(settings_file, function (err, res) {
            if (err)
                reject(err)
            else
                resolve(res)
        })
    })
}

function saveSettings(settings) {
    const json = JSON.stringify(settings, null, '  ');
    fs.writeFile(settings_file, json)
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


module.exports = {
    _langs, _types, buildFaker,
    outputOptions, loadOptions, output_file, settings_file, loadSettings, saveSettings
}