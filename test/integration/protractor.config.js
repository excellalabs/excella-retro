/* jslint node: true */
"use strict";

exports.config = {
    seleniumServerJar: '../node_modules/selenium-standalone/.selenium/selenium-server/2.43.0-server.jar',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
    'browserName': 'phantomjs'
    }
};