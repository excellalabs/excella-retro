/* jslint node: true */
module.exports = function(server) {
    "use strict";

    var path = require('path');
    var inert = require('inert');

    var basePath = process.env.TEMP_DIR || ".";

    var goodPath = path.join(basePath, '/tmp/logs/');

    console.log('Good log path: ' + goodPath);

    // Options to pass into the 'Good' plugin
    var goodOptions = {
        opsInterval: 1000,
        reporters: [{
            reporter: require('good-console'),
            events: { log: '*', response: '*' }
        }, {
            reporter: require('good-file'),
            events: { ops: '*' },
            config: goodPath + 'good_log'
        }]
    };

    server.register([
        {
            register: require("good"),
            options: goodOptions
        },
        inert
    ], function(err) {
        if (err) { throw err; }
    });
};