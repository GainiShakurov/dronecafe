module.exports.config = {
    allScriptsTimeout: 20000,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        '*spec.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:3000/',
    framework: 'mocha',
    mochaOpts: {
        reporter: "spec",
        slow: 10000,
        timeout: 10000,
    },
    onPrepare: () => {
        const chai = require('chai');
        chai.use(require('chai-as-promised'));
    }
};