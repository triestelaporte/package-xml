var parsers = require('./parsers')
var _ = require('lodash')

module.exports = function getMembers(type, contents, types) {
    return _.chain(
        types.filter(metadata => metadata.type === type)
            .map(metadata => {
                return parsers[metadata.class](metadata, contents)
            })).flatten().uniq().value()
}
