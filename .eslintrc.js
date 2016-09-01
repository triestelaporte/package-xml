module.exports = {
    "env": {
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single", {"allowTemplateLiterals": true}
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-undef": 0
    }
};