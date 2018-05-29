#!/usr/bin/env node

const program = require('commander');
const { doSeeding, cleanTable } = require('./db')
const colors = require('colors');
const utils = require('./utils');
const prompt = require('inquirer').createPromptModule();
const console = require('./console');

program
    .version('1.0.0'.cyan, '-v, --version')
    .description('Vollk - Command Line Interface'.bgBlue)
    .usage('[command] <value>')

//-- Run seeding
program
    .command('seed')
    .alias('s')
    .description('Run the seeding')
    .action(function () {
        console.seeding(true,true)
    });

//-- Show Main list
program
    .command('list')
    .alias('l')
    .description('Main list')
    .action(function () {
        console.main()
    });

//-- Rerun the last seeding
program
    .command('run')
    .alias('r')
    .description('Run the last seeding')
    .action(function () {
        console.loadOpts(utils.output_file)
    });

//-- Create a new seed file
program
    .command('create')
    .alias('c')
    .description('Create a new seed file')
    .action(function () {
        console.createSeed()
    });

program.parse(process.argv);