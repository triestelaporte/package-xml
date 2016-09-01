module.exports = function () {
    return {
        files: [
            './js/**/*.js*',
            'test/*.js',
            'test/fixtures/**/*.*',
            '!test/*.spec.js'
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
