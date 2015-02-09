/* jslint node: true */
"use strict";

exports.client = require('webdriverio').remote({
    desiredCapabilities: {
        //browserName: 'firefox'
        browserName: 'phantomjs'
    },

    logLevel: 'silent'
});