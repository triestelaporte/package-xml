var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var expect = chai.expect

describe('Clean the XML', function () {

    this.timeout(30000)

    var config = {
        dir: '/Users/me/Github/project/src'
    }

    it('should Clean the Metdata of unnecessary data', function () {
        var cleanXml = require('./../js/clean-xml')
        return cleanXml(config).then(function (res) {
            expect(res).to.eql('success')
        })
    })

})
