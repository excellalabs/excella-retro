/* jslint node: true */
"use strict";

/**
 * @param {hapi.Server} server - hapi server instance
 * @param {object} requestobj - options for making the request
 */
exports.request = function (server, requestobj, callback) {
    server.inject(requestobj, function (res) {
        if (res.payload) {
            res.body = JSON.parse(res.payload);
        }

        callback(res);
    });
};