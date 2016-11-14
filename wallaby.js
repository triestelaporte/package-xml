module.exports = function () {
    return {
        files: [
            './js/**/*.js*'
        ],
        tests: [
            'test/Demandbase.spec.js' 
        ],
        'testFramework': 'mocha',
        env: {
            type: 'node'
        }
    }
}
