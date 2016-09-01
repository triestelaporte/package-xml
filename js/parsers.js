var xml = require('libxmljs')
var fs = require('fs-extra')

module.exports = {
    BaseMetadataParser: function (metadata, contents) {
        return contents.filter(file => {
            // For each file we need to regex match the directory name and extension
            //   and some other filters like not including hidden files, or meta xml files 
            var dirMatch = file.path.match(new RegExp('/src/' + metadata.dir + '/'))
            var isFile = file.stats.isFile()
            var extensionMatch = file.path.endsWith(metadata.extension)
            var isMetaXml = file.path.match(/-meta.xml/)
            var isHidden = file.path.startsWith('.')
            var isMatch = dirMatch && isFile && extensionMatch && !isMetaXml && !isHidden
            return isMatch
        }).map(file => {
            // Return the filename
            return require('./packageUtils').getFilename(file.path, metadata.extension)
        })
    },
    MetadataXmlElementParser: function (metadata, contents) {
        var _metadata = metadata
        return contents.filter(file => {
            // For each file we need to regex match the directory name and extension
            //   and some other filters like not including hidden files, or meta xml files 
            var dirMatch = file.path.match(new RegExp('/src/' + _metadata.dir + '/'))
            var isFile = file.stats.isFile()
            var isMetaXml = file.path.match(/-meta.xml/)
            var isHidden = file.path.startsWith('.')
            var isMatch = dirMatch && isFile && !isMetaXml && !isHidden
            return isMatch
        }).map(file => {
            var filename = require('./packageUtils').getFilename(file.path, _metadata.extension)
            var xmlString = fs.readFileSync(file.path).toString()
            var xmlDocument = xml.parseXmlString(xmlString)
            var elements = xmlDocument.find(metadata.options.item_xpath, 'http://soap.sforce.com/2006/04/metadata')
            return elements.map(e => filename + '.' + e.text())
        }).reduce((prev, curr, idx, arr) => {
            return curr ? prev.concat(curr) : prev
        }, [])
    },
    RecordTypeParser: function (metadata, contents) {
        // debugger
        return this.MetadataXmlElementParser(metadata, contents)
    },
    CustomLabelsParser: function (metadata, contents) {
        // debugger
        return this.MetadataXmlElementParser(metadata, contents)
    },
    MetadataFilenameParser: function (metadata, contents) {
        return this.BaseMetadataParser(metadata, contents)
    },
    AuraBundleParser: function (metadata, contents) {
        return contents.filter(file => {
            // For each file we need to regex match the directory name and extension
            //   and some other filters like not including hidden files, or meta xml files 
            var isFile = file.stats.isFile()
            var dirMatch = file.path.match(new RegExp('/src/' + metadata.dir + '/'))
            // var extensionMatch = file.path.endsWith(metadata.extension)
            var isMetaXml = file.path.match(/-meta.xml/)
            var isHidden = file.path.startsWith('.')
            return dirMatch && isFile && !isMetaXml && !isHidden //&& extensionMatch 
        }).map(file => {
            // Return the filename
            var name = file.path.substring(0, file.path.lastIndexOf('/'))
            name = name.substring(name.lastIndexOf('/') + 1)
            return name
        })
    },
    BusinessProcessParser: function (metadata, contents) {
        var _metadata = metadata
        return contents.filter(file => {
            // For each file we need to regex match the directory name and extension
            //   and some other filters like not including hidden files, or meta xml files 
            var isFile = file.stats.isFile()
            var dirMatch = file.path.match(new RegExp('/src/' + _metadata.dir + '/'))
            var extensionMatch = file.path.endsWith(_metadata.extension)
            var isMetaXml = file.path.match(/-meta.xml/)
            var isHidden = file.path.startsWith('.')
            return dirMatch && isFile && !isMetaXml && !isHidden
        }).map(file => {
            var filename = require('./packageUtils').getFilename(file.path, _metadata.extension)
            var xmlString = fs.readFileSync(file.path).toString()
            var xmlDocument = xml.parseXmlString(xmlString)
            var elements = xmlDocument.find(metadata.options.item_xpath, 'http://soap.sforce.com/2006/04/metadata')
            return elements.map(e => filename + '.' + e.text())
        }).reduce((prev, curr, idx, arr) => {
            return curr ? prev.concat(curr) : prev
        }, [])
    },
    CustomObjectParser: function (metadata, contents) {
        return this.BaseMetadataParser(metadata, contents)
    },
    MetadataFolderParser: function (metadata, contents) {
        return contents.filter(file => {
            // For each file we need to regex match the directory name and extension
            //   and some other filters like not including hidden files, or meta xml files 
            var dirMatch = file.path.match(new RegExp('/src/' + metadata.dir + '/'))
            var isFile = file.stats.isFile()
            var extensionMatch = file.path.endsWith(metadata.extension)
            var isMetaXml = file.path.match(/-meta.xml/)
            var isHidden = file.path.startsWith('.')
            var isMatch = dirMatch && isFile && extensionMatch && !isMetaXml && !isHidden
            return isMatch
        }).map(file => {
            // Return the filename
            return require('./packageUtils').getFolderAndFilename(file.path, metadata.extension, metadata.dir)
        })
    },
    DocumentParser: function (metadata, contents) {
        return contents.filter(file => {
            // For each file we need to regex match the directory name and extension
            //   and some other filters like not including hidden files, or meta xml files 
            var dirMatch = file.path.match(new RegExp('/src/' + metadata.dir + '/'))
            var isFile = file.stats.isFile()
            var isMetaXml = file.path.match(/-meta.xml/)
            var isHidden = file.path.startsWith('.')
            var isMatch = dirMatch && isFile && !isMetaXml && !isHidden
            return isMatch
        }).map(file => {
            // Return the filename
            var ret = require('./packageUtils').getFolderAndFilenameWithExt(file.path, metadata.dir)
            return ret
        })
    }
}