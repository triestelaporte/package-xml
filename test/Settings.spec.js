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

    it('should get Account Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('AccountSettings', files, metadata, true)
            expect(members).to.contain('Account')
        })
    })

    it('should get Activities Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ActivitiesSettings', files, metadata, true)
            expect(members).to.contain('Activities')
        })
    })

    it('should get Address Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('AddressSettings', files, metadata, true)
            expect(members).to.contain('Address')
        })
    })

    it('should get BusinessHours Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('BusinessHoursSettings', files, metadata, true)
            expect(members).to.contain('BusinessHours')
        })
    })

    it('should get Case Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CaseSettings', files, metadata, true)
            expect(members).to.contain('Case')
        })
    })

    it('should get ChatterAnswers Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ChatterAnswersSettings', files, metadata, true)
            expect(members).to.contain('ChatterAnswers')
        })
    })

    it('should get Company Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CompanySettings', files, metadata, true)
            expect(members).to.contain('Company')
        })
    })

    it('should get Contract Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ContractSettings', files, metadata, true)
            expect(members).to.contain('Contract')
        })
    })

    it('should get Company Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CompanySettings', files, metadata, true)
            expect(members).to.contain('Company')
        })
    })

    it('should get Entitlement Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('EntitlementSettings', files, metadata, true)
            expect(members).to.contain('Entitlement')
        })
    })

    it('should get Forecasting Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ForecastingSettings', files, metadata, true)
            expect(members).to.contain('Forecasting')
        })
    })

    it('should get Ideas Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('IdeasSettings', files, metadata, true)
            expect(members).to.contain('Ideas')
        })
    })

    it('should get Knowledge Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('KnowledgeSettings', files, metadata, true)
            expect(members).to.contain('Knowledge')
        })
    })

    it('should get LiveAgent Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('LiveAgentSettings', files, metadata, true)
            expect(members).to.contain('LiveAgent')
        })
    })

    it('should get Mobile Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('MobileSettings', files, metadata, true)
            expect(members).to.contain('Mobile')
        })
    })

    it('should get Name Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('NameSettings', files, metadata, true)
            expect(members).to.contain('Name')
        })
    })

    it('should get Opportunity Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('OpportunitySettings', files, metadata, true)
            expect(members).to.contain('Opportunity')
        })
    })

    it('should get Order Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('OrderSettings', files, metadata, true)
            expect(members).to.contain('Order')
        })
    })

    it('should get OrgPreference Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('OrgPreferenceSettings', files, metadata, true)
            expect(members).to.contain('OrgPreference')
        })
    })

    it('should get PathAssistant Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('PathAssistantSettings', files, metadata, true)
            expect(members).to.contain('PathAssistant')
        })
    })

    it('should get Product Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ProductSettings', files, metadata, true)
            expect(members).to.contain('Product')
        })
    })

    it('should get Quote Settings', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('QuoteSettings', files, metadata, true)
            expect(members).to.contain('Quote')
        })
    })


})
