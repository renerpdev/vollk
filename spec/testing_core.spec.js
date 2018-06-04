describe('Testing core:', () => {
    const mconsole = require('./../core/console')
    const utils = require('./../core/utils')
    const db = require('./../core/db')
    const fs = require('fs')
    var spy, value

    var options = {
        tables: [{
            name: 'test',
            fields: ["title", "description"],
            fakers: ["lorem.word", "lorem.sentence"],
            lang: 'en',
            queries: 2,
            doClean: false
        }]
    }

    var persisted

    const data = `MODE='development'

DB_CLIENT='mysql'
DB_NAME='vollktestdb'
DB_USER='root'
DB_PASS=
DB_HOST=127.0.0.1

DB_URL=

SQLITE_PATH=
`

    beforeAll(async () => {
        spy_env = spyOn(utils, 'create_env_file_async').and.callThrough()
        spy_doSeeding = spyOn(db, 'doSeeding').and.callThrough()
        spy_seeding = spyOn(db, 'seedingAsync').and.callThrough()
        spy_outputOpts = spyOn(utils, 'output_options_async').and.callThrough()
        spy_json = spyOn(db, 'doSeedingJSON').and.callThrough()
        spy_loadOpts = spyOn(mconsole, 'loadOpts').and.callThrough()

        db.create_table('test',['title','description'])
    });

    beforeEach(async () => {
        value = await utils.create_env_file_async(data)
        await utils.remove_file('output.json') //wait for the file to be removed
    });

    it('should create the .env file containing the properties', async () => {
        var ef = await utils.exists_file('.env')
        var f = await utils.readFileAsync('.env')
        var str = f.toString()

        expect(spy_env).toHaveBeenCalled()
        expect(ef).toBeTruthy()
        expect(str).toContain(data)
    });

    it('the function doSeeding() -> should call function output_options_async() & create the file output.json', async () => {
        persisted = await db.doSeeding(options, false, true)
        var ef = await utils.exists_file('output.json')

        expect(persisted).toBeFalsy()
        expect(spy_seeding).not.toHaveBeenCalled()
        expect(spy_doSeeding).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Boolean), jasmine.any(Boolean))
        expect(spy_outputOpts).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Boolean))
        expect(ef).toBeTruthy()
    });

    it('the function doSeedingJson() -> should call the functions doSeedingJSON(), doSeeding() inside it', async () => {
        await utils.output_options_async(options, true) //creates the output.json file before load it
         db.doSeedingJSON(options) //seed db with the loaded file

        expect(spy_json).toHaveBeenCalled()
        expect(spy_outputOpts).toHaveBeenCalled()
    });

});