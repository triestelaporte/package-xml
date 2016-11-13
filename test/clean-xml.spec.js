var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var expect = chai.expect

describe('Generate a package XML', function () {

    this.timeout(30000)

    var path = '/Users/John/Github/esba/src'

    it('should Clean the Metdata of unnecessary data', function () {
        var cleanXml = require('./../js/clean-xml')
        return cleanXml(path).then(function(res){
            expect(res).to.eql('success')
        })
    })

})
