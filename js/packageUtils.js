var fs = require('fs-extra')
var metadata_map = require('./metadata_map.json')
var _ = require('lodash')

function getDirectoryContents(dir) {
    return new Promise(function (resolve, reject) {
        var contents = []
        if (dir) {
            fs.walk(dir)
                .on('data', function (item) {
                    contents.push(item)
                })
                .on('end', function () {
                    resolve(contents)
                })
                .on('error', function (err) {
                    throw err
                })
                .on('close', function () {
                    // console.log('finished')
                })
        } else {
            resolve(contents)
        }
    })
}
function getMetadataTypeNames() {
    return _.flatten(Object.keys(metadata_map).map(key => {
        return metadata_map[key].map(val => {
            return val.type
        })
    })).sort()
}
function getMetadataTypes() {
    return _.flatten(Object.keys(metadata_map).map(key => {
        metadata_map[key].forEach(i => { i.dir = key })
        return metadata_map[key]
    }))
}
function getFilename(path, extension) {
    if (path && extension) {
        return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf(extension) - 1)
    }
    return ''
}
function getFolderAndFilename(path, extension, type) {
    if (path && extension) {
        var seperator = '/src/' + type + '/'
        var start = path.indexOf(seperator) + seperator.length;
        var end = path.lastIndexOf(extension) - 1
        if(end > start){
            var ret = path.substring(start, end)
            return ret
        } else {
            var ret = path.substring(start)
            return ret
        }
    }
    return ''
}
function getFolderAndFilenameWithExt(path, type) {
    if (path) {
        var seperator = '/src/' + type + '/'
        var start = path.indexOf(seperator) + seperator.length;
        var end = path.length
        var ret = path.substring(start, end)
        return ret
    }
    return ''
}

module.exports = {
    getDirectoryContents: getDirectoryContents,
    getMetadataTypeNames: getMetadataTypeNames,
    getMetadataTypes: getMetadataTypes,
    getFilename: getFilename,
    getFolderAndFilename: getFolderAndFilename,
    getFolderAndFilenameWithExt: getFolderAndFilenameWithExt
}
