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
    .argv

require('./js/packageXmlGenerator')(argv.dir, argv.version, argv.name).then(markup => {
    return fs.outputFile(getPath(argv), markup, (err) => {
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
