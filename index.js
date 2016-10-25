#!/usr/bin/env node
var fs = require('fs-extra')
var xml = require('libxmljs')
var argv = require('yargs')
    .option('D', {
        alias: 'dir',
        demand: true,
        default: './src',
        describe: 'The path to the source directory containing your SFDC files and metadata.  Your package.xml file will end up here.',
        type: 'string'
    })
    .option('X', {
        alias: 'destroy',
        demand: false,
        default: false,
        describe: 'Create a destructiveChanges.xml file.',
        type: 'boolean'
    })
    .option('v', {
        alias: 'version',
        demand: false,
        describe: 'The Saleforce API Version you wish to target with this package.',
        type: 'string'
    })
    .option('n', {
        alias: 'name',
        demand: false,
        describe: 'The name of the package.',
        type: 'string'
    })
    .option('m', {
        alias: 'managed',
        demand: false,
        default: false,
        describe: 'Include Managed Package Fields.',
        type: 'boolean'
    })
    .argv
var start = Date.now()
require('./js/packageXmlGenerator')(argv.dir, argv.version, argv.name, argv.managed).then(markup => {
    return fs.outputFile(getPath(argv), markup, (err) => {
        console.log('Package.xml generated in ' + (Date.now() - start) + 'ms')
        if (err) console.log(err)
    });
})

function getPath(argv) {
    if (argv.dir.startsWith('/')) {
        // Path is absolute
        return argv.dir + '/package.xml'
    } else if (argv.dir.startsWith('./')) {
        // Path is relative, or default
        return process.cwd() + '/' + argv.dir.substring(2) + '/package.xml'
    } else {
        // path is relative, without the default ./
        return process.cwd() + '/' + argv.dir + '/package.xml'
    }
}
