#!/usr/bin/env node
var fs = require('fs-extra')
var xml = require('libxmljs')
var path = require('path')
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
    .option('i', {
        alias: 'installScript',
        demand: false,
        describe: 'The name of the install script handler.',
        type: 'string'
    })
    .option('m', {
        alias: 'managed',
        demand: false,
        default: false,
        describe: 'Include Managed Package Fields.',
        type: 'boolean'
    })
    .option('c', {
        alias: 'clean',
        demand: false,
        default: false,
        describe: 'Clean the Metadata files',
        type: 'boolean'
    })
    .option('C', {
        alias: 'clean-config',
        demand: false,
        default: '',
        describe: 'Clean the Metadata files from a provided configuration file',
        type: 'string'
    })
    .help('h')
    .argv

var start = Date.now()
argv.dir = getPath(argv.dir)
if (argv.clean) {
    return require('./js/clean-xml')(argv).then((res) => reportFinished(null, 'Clean'))
} else if (argv['clean-config']) {
    Object.assign(argv, fs.readJsonSync(getPath(argv['clean-config'])))
    return require('./js/clean-xml')(argv).then((res) => reportFinished(null, 'Clean'))
} else {
    return require('./js/packageXmlGenerator')(argv).then(markup => {
        return fs.outputFile(argv.dir + '/package.xml', markup, (err) => reportFinished(err, 'Package.xml'));
    })
}

function getPath(filePath) {
    if (filePath.startsWith('/')) {
        // Dir is absolute path, make sure it's real
        try {
            if (fs.realpathSync(filePath)) {
                return filePath
            } else {
                throw (filePath + ' is not a real path.  Please check your path and try again')
            }
        } catch (error) {
            throw (filePath + ' is not a real path.  Please check your path and try again')
        }
    } else {
        // Dir is relative path.. try to normalize it
        try {
            var filePath = path.normalize(process.cwd() + '/' + filePath)
            if (fs.realpathSync(filePath)) {
                return filePath
            } else {
                throw (filePath + ' is not a real path.  Please check your path and try again')
            }
        } catch (error) {
            throw (filePath + ' is not a real path.  Please check your path and try again')
        }
    }
}

function reportFinished(err, msg){
    if (err) console.log(err)
    console.log(msg + ' process completed in ' + (Date.now() - start) + 'ms')
}
