const fs = require('fs')
const path = require('path')

const output_file = 'output.json'
const settings_file = 'settings.json'

var _types = ['lorem', 'name', 'address', 'internet', 'commerce',
    'phone', 'date', 'random', 'system', 'image', 'finance', 'company']

var _fakers = {
    'lorem': [
        'word',
        'sentence',
        'slug',
        'sentences',
        'paragraph',
        'paragraphs',
        'lines',
    ],
    'name': [
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
    'address': [
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
    'internet': [
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
    'commerce': [
        'color',
        'department',
        'productName',
        'price',
        'productAdjective',
        'productMaterial',
        'product',
    ],
    'phone': [
        'phoneNumber',
        'phoneNumberFormat',
    ],
    'date': [
        'past',
        'future',
        'between',
        'recent',
        'month',
        'weekday',
    ],
    'random': [
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
    'system': [
        'fileName',
        'commonFileName',
        'mimeType',
        'commonFileType',
        'commonFileExt',
        'fileType',
        'fileExt',
        'semver',
    ],
    'image': [
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
    'finance': [
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
    'company': [
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

function outputOptions(opts, write) {
    const json = JSON.stringify(opts, null, '  ');
    console.log(json.bgWhite.blue);
    if (write) {
        fs.writeFile(path.resolve('output.json'), json)
    }
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


function existENV() {
    return new Promise((resolve, reject) => {
        fs.exists(path.resolve('.env'), function (exist) {
            if (exist)
                resolve(true)
            else
                reject(false)
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


module.exports = {
    _langs, _types, _fakers, buildFaker,
    outputOptions, loadOptions, output_file, settings_file, loadSettings, saveSettings,
    existENV
}