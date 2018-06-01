#!/usr/bin/env node

const program = require('commander');
const colors = require('colors');
const utils = require('./utils');
const prompt = require('inquirer').createPromptModule();
const mconsole = require('./console');
const pjson = require('./../package.json')

program
    .version(pjson.version.cyan, '-v, --version')
    .description('Vollk - Command Line Interface'.bgBlue)
    .usage('[cmd] <option>')

//-- Run seeding
program
    .command('seed')
    .alias('s')
    .description('Run the seeding')
    .action(function () {
        mconsole.seeding(true, true)
    });

//-- Show Main list
program
    .command('list')
    .alias('l')
    .description('Main list')
    .action(function () {
        mconsole.main()
    });

//-- Rerun the last seeding
program
    .command('run')
    .alias('r')
    .description('Run the last seeding')
    .action(function () {
        mconsole.loadOpts(utils.output_file)
    });

//-- Create a new seed file
program
    .command('create')
    .alias('c')
    .description('Create a new seed file')
    .action(function () {
        mconsole.createSeed()
    });

//-- Create an empty .env file
program
    .command('env')
    .alias('e')
    .description('Create an empty .env file')
    .action(function () {
        mconsole.create_env_file()
    });

program.parse(process.argv);