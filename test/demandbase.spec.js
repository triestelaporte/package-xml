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
    var root = '/Users/John/Github/demandbase/src'
    var metadata, generator, getDirectoryContentsPromise
    before(function () {
        getDirectoryContentsPromise = utils.getDirectoryContents(root)
        metadata = utils.getMetadataTypes()
        generator = require('./../js/packageXmlGenerator')
    })


    it('should get Custom Labels Classes', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CustomLabel', files, metadata)
            expect(members).to.contain('DAE_BadQuery')
        })
    })


})
