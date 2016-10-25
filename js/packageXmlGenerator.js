var xml = require('libxmljs')
var metadata_map = require('./../js/metadata_map.json')
var utils = require('./../js/packageUtils')
var metadata = utils.getMetadataTypes()
var fs = require('fs-extra')
var self = {}

module.exports = function (path, api_version, package_name, managed) {
    self.managed = managed
    // Get/Set path and insure it actually exists
    try {
        self.path = fs.realpathSync(path)
    } catch (error) {
        console.error(path + ' is not a real path.  Please check your path and try again')
        return Promise.reject(error)
    }
    
    if (package_name) {
        self.package_name = package_name
    } else {
        try {
            var xmlString = fs.readFileSync(self.path + '/package.xml', 'utf8')
            var xmlDocument = xml.parseXmlString(xmlString)
            var names = xmlDocument.find('./xmlns:fullName', 'http://soap.sforce.com/2006/04/metadata')
            self.package_name = names[0].text()
        } catch (error) {
            self.package_name = null
        }
    }

    if (api_version) {
        self.api_version = api_version
    } else {
        try {
            var xmlString = fs.readFileSync(self.path + '/package.xml', 'utf8')
            var xmlDocument = xml.parseXmlString(xmlString)
            var versions = xmlDocument.find('./xmlns:version', 'http://soap.sforce.com/2006/04/metadata')
            self.api_version = versions[0].text()
        } catch (error) {
            self.api_version = '37.0'
        }
    }

    // ======================================
    // ============   Generate   ============
    // ======================================
    return utils.getDirectoryContents(self.path).then(files => {
        return get_package_xml.call(self, files)
    })
}

function get_package_xml(contents) {
    var doc = new xml.Document()
    var Package = doc.node('Package').attr({ 'xmlns': 'http://soap.sforce.com/2006/04/metadata' })
    // ======================================
    // ============ Print header ============
    // ======================================
    if (self.package_name) {
        // Escape special characters
        Package.node('fullName', encodeURIComponent(self.package_name).replace(/%20/g, ' '))
    }
    if (self.install_class) {
        Package.node('postInstallClass', self.install_class)
    }
    if (self.uninstall_class) {
        Package.node('uninstallClass', self.uninstall_class)
    }
    // ======================================
    // ========= Print types sections =======
    // ======================================
    utils.getMetadataTypeNames().forEach(function (type) {
        var members = require('./members')(type, contents, metadata, self.managed)
        if (members.length > 0) {
            // Generate the XML and add it to the thing
            var Types = Package.node('types')
            members.forEach(member => Types.node('members', member))
            Types.node('name', type)
        }
    })
    // ======================================
    // ============ Print footer ============
    // ======================================
    Package.node('version', self.api_version)
    return doc.toString()
}
