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

    it('should get Facebook Provider', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('FacebookProvider', files, metadata, true)
            expect(members).to.contain('AuthProvider')
        })
    })

    it('should get Facebook Provider', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('FacebookProvider', files, metadata, true)
            expect(members).to.contain('AuthProvider')
        })
    })

    it('should get Google Provider', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('GoogleProvider', files, metadata, true)
            expect(members).to.contain('AuthProvider')
        })
    })

})
