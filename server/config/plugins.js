/* jslint node: true */
module.exports = function(server) {
    "use strict";

    var goodPath = 'tmp/logs/';

    if(process.env.TEMP_DIR) {
        var path = require('path');
        goodPath = path.join(process.env.TEMP_DIR, goodPath);
    }
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