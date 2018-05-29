# `Vollk`.js

## <img align="center" alt="vollk Logo" src="assets/logo.svg" height=150 title="vollk.js"/>

### This is a command line tool for [Knex](http://knexjs.org).js to seed `MySQL`, `PostgreSQL` and other databases

## Table of topics
1. [Documentation](#documentation)
2. [How to install it?](#installation)
3. [Basic configuration](#basic_configuration)
4. [Run and see](#run_and_see_the_magic)
5. [List of commands](#list_of_commands)
6. [Other database connections](#other_database_connections)
6. [Further help](#help)

## Documentation

This tool integrates the [inquirer](https://www.npmjs.com/package/inquirer).js library for making more interactive the commands built in [commander](https://www.npmjs.com/package/commander).js. Also this tool incorporates [faker](https://www.npmjs.com/package/faker).js for generating massive amounts of fake data.

## Installation

> #### `git clone https://github.com/2rhop/vollk.git vollk`
> #### `npm install`
> #### `npm link`

## Configuration

Before run it you need to create an `.env` file. Copy and paste this code from [here](.env.example) or change the name of the file `.env.example` to `.env` inside this project.

Finanlly you need to fill this `ENV` variables with theirs respective values.

## Run and see the magic

> ### `vollk` list

## List of commands

1. `list` (lists all options)

2. `seed` (seeds the database with yours especs)

3. `create` (creates a seed file)

4. `run` (Runs the last seed file)

## Some options for this commands

* `--version`
* `--help`

## Other database connections

* `npm install` mysql2
* `npm install` mariasql
* `npm install` strong-oracle
* `npm install` oracle
* `npm install` mssql

## Further help

Send me an [email](mailto:renerp2016@gmail.com) if you have some doubt or just add an [issue](https://github.com/2rhop/vollk/issues)