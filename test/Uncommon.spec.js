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

    this.timeout(30000);
    // Private variables, set in Before action
    var root = '/Users/me/Github/package-xml/test/fixtures/src'
    var metadata, generator, getDirectoryContentsPromise

    before(function () {
        getDirectoryContentsPromise = utils.getDirectoryContents(root)
        metadata = utils.getMetadataTypes()
        generator = require('./../js/packageXmlGenerator')
    })

    it('should get Acion Link Group Templates', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ActionLinkGroupTemplate', files, metadata, true)
            expect(members).to.contain('MyPackage')
        })
    })

    it('should get Analytics Snapshots', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('AnalyticSnapshot', files, metadata, true)
            expect(members).to.contain('my_snapshot')
        })
    })

    it('should get Custom Apex Test Suites', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexTestSuite', files, metadata, true)
            expect(members).to.contain('Suite1')
        })
    })

    it('should get App Menus', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('AppMenu', files, metadata, true)
            expect(members).to.contain('AppSwitcher')
        })
    })

    it('should get Approval Processes', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApprovalProcess', files, metadata, true)
            expect(members).to.contain('SampleProcess')
        })
    })

    it('should get Article Types', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CustomObject', files, metadata, true)
            expect(members).to.contain('newarticle__kav')
        })
    })

    it('should get Assignment Rules', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('AssignmentRules', files, metadata, true)
            expect(members).to.contain('Case.samplerule')
        })
    })

    it('should get Auto Response Rules', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('AutoResponseRules', files, metadata, true)
            expect(members).to.contain('Case.ajbdeploytest2')
        })
    })

    it('should get Call Centers', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CallCenter', files, metadata, true)
            expect(members).to.contain('DemoAdapterOpenCTI')
        })
    })

    it('should get Certificates', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Certificate', files, metadata, true)
            expect(members).to.contain('MyCertificateName')
        })
    })

    it('should get Clean Data Services', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CleanDataService', files, metadata, true)
            expect(members).to.contain('DataService_Leads_Enrichment')
        })
    })

    it('should get Dashboards', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Dashboard', files, metadata, true)
            expect(members).to.contain('Samples/Sample')
        })
    })

    it('should get Communities', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Community', files, metadata, true)
            expect(members).to.contain('Sample')
        })
    })

    it('should get Queues', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Queue', files, metadata, true)
            expect(members).to.contain('MemberQueue')
        })
    })

    it('should get Criteria SharingRules', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('SharingCriteriaRule', files, metadata, true)
            expect(members).to.contain('Account.AccountCriteriaShareWithCEO')
        })
    })

    it('should get Owner SharingRules', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('SharingOwnerRule', files, metadata, true)
            expect(members).to.contain('Account.Foo')
        })
    })

    it('should get Territory SharingRules', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('SharingTerritoryRule', files, metadata, true)
            expect(members).to.contain('Account.MyAccountTerritoryRule')
        })
    })

})
