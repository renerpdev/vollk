#!/usr/bin/env node

const program = require('commander');
const { doSeeding, cleanTable } = require('./db')
const colors = require('colors');
const utils = require('./utils');
const prompt = require('inquirer').createPromptModule();
const console = require('./console');

program
    .version('0.1.0'.cyan, '-v, --version')
    .description('Vollk - Command Line Interface'.bgBlue)
    .usage('[command] <value>')

//-- Run seeding
program
    .command('seed')
    .alias('s')
    .description('Run the seeding')
    .action(function () {
        console.seeding()
    });

//-- Show Main list
program
    .command('list')
    .alias('l')
    .description('Main list')
    .action(function () {
        console.main()
    });

//-- Load options
program
    .command('load')
    .alias('o')
    .description('Load options')
    .action(function () {
        console.loadOpts(utils.output_file)
    });

program.parse(process.argv);