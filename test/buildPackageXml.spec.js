var chai = require('chai')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect
var fs = require('fs-extra')
var xml = require('libxmljs')
var PackageXmlGenerator = require('./../js/packageXmlGenerator')
var utils = require('./../js/packageUtils')
var mocks = require('./mocks')

var metadata = utils.getMetadataTypes()
var root = process.cwd() + '/test/fixtures/src'
var getDirectoryContents = utils.getDirectoryContents(root)

describe('Generate a package XML', function () {
    it('should make an xml document', function() {
        var generate = PackageXmlGenerator(undefined, undefined, undefined)
        expect(generate()).to.eventually.contain('<?xml')
    })

    it('should make a sample Package XML', function () {
        var api_version = '36.0'
        var package_name = 'Test & Package'
        var generate = PackageXmlGenerator(undefined, api_version, package_name)
        return generate().then(markup => {
            expect(markup).to.eql(mocks.sampleXml)
        })
    })

    it('should get Apex Classes', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('ApexClass', files, metadata)
            expect(members).to.contain('AccountTriggerHandlerCS_Test')
        })
    })

    it('should get Apex Components', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('ApexComponent', files, metadata)
            expect(members).to.contain('DocumentManager')
        })
    })

    it('should get Apex Pages', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('ApexPage', files, metadata)
            expect(members).to.contain('Practitioner_Create')
        })
    })

    it('should get Aura (Lightning) Bundles', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('AuraDefinitionBundle', files, metadata)
            expect(members).to.contain('SVG')
        })
    })

    it('should get Business Processes', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('BusinessProcess', files, metadata)
            expect(members).to.contain('Case.Grievance')
        })
    })

    it('should get Compact Layouts', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('CompactLayout', files, metadata)
            expect(members).to.contain('Opportunity.Provider_Qualification')
        })
    })

    it('should get Custom Objects', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('CustomObject', files, metadata)
            expect(members).to.contain('ZIP_Code__c')
        })
    })

    it('should get Custom Tabs', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('CustomTab', files, metadata)
            expect(members).to.contain('ZIP_Code__c')
        })
    })

    it('should get Lightning Flexipages', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('FlexiPage', files, metadata)
            expect(members).to.contain('SparkleCare_Home')
        })
    })

    it('should get Letterhead', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('Letterhead', files, metadata)
            expect(members).to.contain('ESBA_Letterhead')
        })
    })

    it('should get PermissionSet', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('PermissionSet', files, metadata)
            expect(members).to.contain('All_Access')
        })
    })

    it('should get RecordType', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('RecordType', files, metadata)
            expect(members).to.contain('Opportunity.Provider')
        })
    })

    it('should get EmailTemplate', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('EmailTemplate', files, metadata)
            expect(members).to.contain('PPM_Email_Templates/PPM_Vetting_Document_Request')
        })
    })

    it('should get Documents', function() {
        return getDirectoryContents.then(files => {
            var members = utils.getMembers('Document', files, metadata)
            expect(members).to.contain('ESBA_Assets/ESBALogo.png')
        })
    })

    it('should create the ESBA SPARKLE package', function () {
        var esbaXml = fs.readFileSync(root + '/package.xml').toString()
        var api_version = '37.0'
        var package_name = 'ESBA SPARKLE'
        var generate = PackageXmlGenerator(root, api_version, package_name)
        return generate().then(markup => {
            // console.log(markup)
            fs.outputFile('/Users/John/Github/CumulusCI/test/package.xml', markup)
            expect(markup).to.eql(esbaXml)
        })
    })

})
