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
    var root = '/Users/John/Github/package-xml/test/fixtures/src'
    // var root = '/Users/John/Github/esba/src'
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

})
