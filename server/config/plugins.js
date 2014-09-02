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

    var ioOptions = {
        messageHandler: function (socket) {
            return function (message) {
                console.log("Message sent!");
                socket.send(message);
            };
        },
        logLevel: 2
    };

    server.pack.register([
        {
            plugin: require("good"),
            options: goodOptions
        },
        {
            plugin: require("hapi-socket"),
            options: ioOptions
        }
    ], function(err) {
        if (err) { throw err; }
    });
};