var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var expect = chai.expect
var fs = require('fs-extra')
var xml = require('libxmljs')
var utils = require('./../js/packageUtils')
var mocks = require('./../js/mocks')
var getMembers = require('./../js/members')
var path = require('path')

describe('Generate a package XML', function () {

    this.timeout(30000);
    var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
    var fixtures = path.resolve(home, 'GitHub', 'package-xml', 'test', 'fixtures')
    var root = path.resolve(fixtures, 'src')
    var empty = path.resolve(fixtures, 'empty')
    var metadata, generator, getDirectoryContentsPromise

    before(function () {
        getDirectoryContentsPromise = utils.getDirectoryContents(root)
        metadata = utils.getMetadataTypes()
        generator = require('./../js/packageXmlGenerator')
    })

    it('should get Custom Applications', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CustomApplication', files, metadata, true)
            expect(members).to.contain('Collaboration')
        })
    })

    it('should get Components', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexComponent', files, metadata, true)
            expect(members).to.contain('MyhelloWorld')
        })
    })

    it('should get Custom Objects', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CustomObject', files, metadata, true)
            expect(members).to.contain('MyFirstObject__c')
        })
    })

    it('should get Platform Events', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CustomObject', files, metadata, true)
            expect(members).to.contain('PlatformEvent__e')
    })
    })

    it('should get Custom Apex Classes', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexClass', files, metadata, true)
            expect(members).to.contain('MyhelloWorld')
        })
    })

    it('should get Custom Apex Pages', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexPage', files, metadata, true)
            expect(members).to.contain('SampleApexPage')
        })
    })

    it('should get Custom Apex Triggers', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexTrigger', files, metadata, true)
            expect(members).to.contain('MyHelloWorld')
        })
    })

    it('should get Groups', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Group', files, metadata, true)
            expect(members).to.contain('Provider_Sharing')
        })
    })

    it('should get Connected Apps', function(){
        return getDirectoryContentsPromise.then(files=>{
            var members = getMembers('ConnectedApp', files, metadata, false)
            expect(members).to.contain('sample')
        })
    })

    it('should get Global Value Sets', function(){
        return getDirectoryContentsPromise.then(files=>{
            var members = getMembers('GlobalValueSet', files, metadata, false)
            expect(members).to.contain('Territories')
        })
    })

    it('should get Content Assets', function(){
        return getDirectoryContentsPromise.then(files=>{
            var members = getMembers('ContentAsset', files, metadata, false)
            expect(members).to.contain('MyAsset')
        })
    })

    it('should make a sample Package XML from an empty directory', function () {
        var config = {
            dir: empty,
            name: 'Test & Package',
            version: '36.0'
        }
        return expect(generator(config)).to.eventually.eql(mocks.sampleXml)
    })

})
