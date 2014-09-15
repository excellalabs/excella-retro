/* jslint node: true */
module.exports = function(server) {
    "use strict";

    var path = require('path');

    var basePath = process.env.TEMP_DIR || ".";

    var goodPath = path.join(basePath, '/tmp/logs/');

    console.log('Good log path: ' + goodPath);

    // Options to pass into the 'Good' plugin
    var goodOptions = {
        subscribers: {
            console: ['ops', 'request', 'log', 'error'],
            goodPath: ['ops', 'request', 'log', 'error']
        }
    };

    server.pack.register([
        {
            plugin: require("good"),
            options: goodOptions
        }
    ], function(err) {
        if (err) { throw err; }
    });
};