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
    // var root = '/Users/John/Github/package-xml/test/fixtures/src'
    var root = '/Users/John/Github/demandbase/src'
    var metadata, generator, getDirectoryContentsPromise
    before(function () {
        getDirectoryContentsPromise = utils.getDirectoryContents(root)
        metadata = utils.getMetadataTypes()
        generator = require('./../js/packageXmlGenerator')
    })


    // it('should get Components', function () {
    //     return getDirectoryContentsPromise.then(files => {
    //         var members = getMembers('ApexComponent', files, metadata, true)
    //         expect(members).to.contain('DocumentManager')
    //     })
    // })

    // it('should get Managed Custom object', function () {
    //     return getDirectoryContentsPromise.then(files => {
    //         var members = getMembers('CustomObject', files, metadata, true)
    //         expect(members).to.contain('HealthCloudGA__EhrPractitionerRole__c')
    //     })
    // })

    // it('should get Managed Custom object', function () {
    //     return getDirectoryContentsPromise.then(files => {
    //         var members = getMembers('CustomObject', files, metadata, false)
    //         expect(members).to.not.contain('HealthCloudGA__EhrPractitionerRole__c')
    //     })
    // })

    // it('should get Managed Custom fields', function () {
    //     return getDirectoryContentsPromise.then(files => {
    //         var members = getMembers('CustomField', files, metadata, true)
    //         expect(members).to.contain('Activity.HealthCloudGA__CarePlanGoal__c')
    //     })
    // })

    // it('should not get Managed Custom fields', function () {
    //     return getDirectoryContentsPromise.then(files => {
    //         var members = getMembers('CustomField', files, metadata, false)
    //         expect(members).to.not.contain('Activity.HealthCloudGA__CarePlanGoal__c')
    //     })
    // })

})
