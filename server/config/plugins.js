/* jslint node: true */
module.exports = function(server) {
    "use strict";
    // Options to pass into the 'Good' plugin
    var goodOptions = {
        subscribers: {
            console: ['ops', 'request', 'log', 'error'],
            'tmp/logs/': ['ops', 'request', 'log', 'error']
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