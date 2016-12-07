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
        getDirectoryContentsPromise = utils.getDirectoryContents(root)
        metadata = utils.getMetadataTypes()
        generator = require('./../js/packageXmlGenerator')
    })

    it('should get an xml document', function () {
        var config = {
            dir: root,
            name: 'TEST PACKAGE',
            version: '36.0'
        }
        return expect(generator(config)).to.eventually.contain('<?xml')
    })

    it('should not get an xml document for a bad path', function () {
        var config = {
            dir: undefined,
            name: 'TEST PACKAGE',
            version: '36.0'
        }
        return expect(generator(config)).to.eventually.be.rejected
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
            expect(members).to.contain('Finance_Manager')
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
            expect(members).to.not.contain('RAM_Email_Templates-meta.xml')
            expect(members).to.not.contain('PPM_Email_Templates-meta.xml')
        })
    })

    it('should get Reports', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Report', files, metadata)
            expect(members).to.contain('PPM_Reports')
            expect(members).to.contain('PPM_Reports/ESBA_BHPN_Providers')
            expect(members).to.not.contain('PPM_Reports/ESBA_BHPN_Providers-meta.xml')
        })
    })

    it('should get Documents', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Document', files, metadata)
            expect(members).to.contain('ESBA_Assets/ESBALogo.png')
        })
    })

    it('should make a sample Package XML from an empty directory', function () {
        var config = {
            dir: '/Users/John/Github/package-xml/test/fixtures/empty',
            name: 'Test & Package',
            version: '36.0'
        }
        return expect(generator(config)).to.eventually.eql(mocks.sampleXml)
    })

    it('should generate the actual file', function () {
        var config = {
            dir: root,
            name: 'ESBA SPARKLE',
            version: '37.0'
        }
        return generator(config).then(markup => {
            expect(markup).to.match(/>Case.IsEscalated</)
            expect(markup).to.match(/>Case.Description</)
        })
    })


})
