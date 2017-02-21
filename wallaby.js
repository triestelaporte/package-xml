module.exports = function () {
    return {
        files: [
            './js/**/*.js*'
        ],
        tests: [
            'test/*.spec.js' 
        ],
        'testFramework': 'mocha',
        env: {
            type: 'node'
        }
    }
}
