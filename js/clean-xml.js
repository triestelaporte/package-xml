var assert = require('assert')
var fs = require('fs-extra')
var xml = require('libxmljs')

module.exports = function (_config) {
    var config = _config || {}
    assert(config.dir, 'Path must be defined')
    var elementsToRemove = config.selectors || [
        "./xmlns:packageVersions",
        "./xmlns:applicationVisibilities[xmlns:visible = 'false']",
        "./xmlns:classAccesses[xmlns:enabled='false']",
        "./xmlns:fieldPermissions[xmlns:editable='false' and xmlns:readable='false']",
        "./xmlns:objectPermissions[xmlns:allowCreate = 'false' and xmlns:allowDelete = 'false' and xmlns:allowEdit = 'false' and xmlns:allowRead = 'false' and xmlns:modifyAllRecords = 'false' and xmlns:viewAllRecords = 'false']",
        "./xmlns:pageAccesses[xmlns:enabled = 'false']",
        "./xmlns:userPermissions[xmlns:enabled = 'false']",
        "./xmlns:recordTypeVisibilities[xmlns:visible = 'false']",
        "./xmlns:tabSettings[xmlns:visibility = 'None']"
    ];
    var extensions = config.extensions || [
        "-meta.xml",
        ".profile",
        ".permissionset",
    ];
    var ns = config.namespace || 'http://soap.sforce.com/2006/04/metadata';
    // packageVersions
    return new Promise(function (resolve, reject) {
        fs.stat(config.dir, function (err, stats) {
            if (stats.isDirectory()) {
                fs.walk(config.dir).on('data', function (item) {
                    removeElementsAndWriteFile(item, extensions, elementsToRemove, ns)
                }).on('end', function () {
                    resolve('success')
                }).on('error', function (err) {
                    reject(err)
                })
            }
        })
    })

}
function removeElementsAndWriteFile(file, extensions, elementsToRemove, ns) {
    extensions.forEach(ext => {
        if (file.path.endsWith(ext)) {
            fs.readFile(file.path, 'utf8', (err, data) => {
                if (data) writeFile(file, removeElements(elementsToRemove, xml.parseXmlString(data), ns))
            })
        }
    })
}
function removeElements(elem, xmlDoc, ns) {
    elem.map(selector => xmlDoc.find(selector, ns))
        .reduce((prev, curr) => prev.concat(curr), [])
        .forEach(el => { if (el) el.remove() })
    return xmlDoc
}
function writeFile(item, xmlDoc) {
    // Remove lines with only whitespace and Write the file
    fs.outputFile(item.path, xmlDoc.toString().split('\n').filter((line, idx, arr) => {
        // Make sure that the line has nonWhitespace characters in it
        var isMatch = line.match(/\S/);
        var isLastLine = (idx + 1) === arr.length
        return isLastLine || isMatch
    }).join('\n'))
}
