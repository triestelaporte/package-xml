module.exports = function () {
    return {
        files: [
            './js/**/*.js*'
        ],
        tests: [
            'test/ESBA.spec.js' 
        ],
        'testFramework': 'mocha',
        env: {
            type: 'node'
        }
    }
}
