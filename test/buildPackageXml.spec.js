var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var expect = chai.expect
var fs = require('fs-extra')
var xml = require('libxmljs')
var utils = require('./../js/packageUtils')
var mocks = require('./../js/mocks')
var getMembers = require('./../js/members')

describe('Generate a package XML', function () {
    // Private variables, set in Before action
    // var root = '/Users/John/Github/package-xml/test/fixtures/src'
    var root = '/Users/John/Github/esba/src'
    var metadata, generator, getDirectoryContentsPromise
    before(function () {
        console.log(root)
        getDirectoryContentsPromise = utils.getDirectoryContents(root)
        metadata = utils.getMetadataTypes()
        generator = require('./../js/packageXmlGenerator')
    })

    it('should get an xml document', function () {
        return expect(generator(root, undefined, undefined)).to.eventually.contain('<?xml')
    })

    it('should not get an xml document for a bad path', function () {
        return expect(generator(undefined, undefined, undefined)).to.eventually.be.rejected
    })

    it('should get Apex Classes', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexClass', files, metadata)
            expect(members).to.contain('AccountTriggerHandlerCS_Test')
        })
    })

    it('should get Apex Components', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexComponent', files, metadata)
            expect(members).to.contain('DocumentManager')
        })
    })

    it('should get Apex Pages', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexPage', files, metadata)
            expect(members).to.contain('Practitioner_Create')
        })
    })

    it('should get Aura (Lightning) Bundles', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('AuraDefinitionBundle', files, metadata)
            expect(members).to.contain('SVG')
        })
    })

    it('should get Business Processes', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('BusinessProcess', files, metadata)
            expect(members).to.contain('Case.Grievance')
        })
    })

    it('should get Compact Layouts', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CompactLayout', files, metadata)
            expect(members).to.contain('Account.PPM_Compact_Layout')
        })
    })

    it('should get Custom Objects', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CustomObject', files, metadata)
            expect(members).to.contain('ZIP_Code__c')
        })
    })

    it('should get Custom Tabs', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CustomTab', files, metadata)
            expect(members).to.contain('ZIP_Code__c')
        })
    })

    it('should get Lightning Flexipages', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('FlexiPage', files, metadata)
            expect(members).to.contain('SparkleCare_Home')
        })
    })

    it('should get Letterhead', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Letterhead', files, metadata)
            expect(members).to.contain('ESBA_Letterhead')
        })
    })

    it('should get PermissionSet', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('PermissionSet', files, metadata)
            expect(members).to.contain('All_Access')
        })
    })

    it('should get RecordType', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('RecordType', files, metadata)
            expect(members).to.contain('Case.ABA')
        })
    })

    it('should get EmailTemplate', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('EmailTemplate', files, metadata)
            expect(members).to.contain('PPM_Email_Templates/PPM_Vetting_Document_Request')
        })
    })

    it('should get Documents', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Document', files, metadata)
            expect(members).to.contain('ESBA_Assets/ESBALogo.png')
        })
    })

    it('should make a sample Package XML from an empty directory', function () {
        var emptyDirectory = '/Users/John/Github/package-xml/test/fixtures/empty'
        var api_version = '36.0'
        var package_name = 'Test & Package'
        return expect(generator(emptyDirectory, api_version, package_name)).to.eventually.eql(mocks.sampleXml)
    })

    it('should create the actual file', function () {
        // var esbaXml = fs.readFileSync(path).toString()
        var api_version = '37.0'
        var package_name = 'ESBA SPARKLE'
        return generator(root, api_version, package_name).then(markup => {
            var path = root + '/package.xml'
            fs.outputFile(path, markup)
            var result = fs.readFileSync(path, 'utf8')
            expect(markup).to.eql(result)
        })
    })

    it('should create the actual file', function () {
        // var esbaXml = fs.readFileSync(path).toString()
        var api_version = '37.0'
        var package_name = 'ESBA SPARKLE'
        return generator(root, api_version, package_name).then(markup => {
            return expect(markup).to.not.match(/Case.IsEscalated/)
        })
    })


})
