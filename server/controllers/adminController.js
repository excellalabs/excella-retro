/* jslint node: true */
"use strict";

var admin = require('../models/admin');
var Hapi = require('hapi');

module.exports = {
    addFeedback: {
        handler: function (request, reply) {
            admin.addFeedback(request.payload.feedback, function (err, feedback) {
                if (err) {
                    var error = Hapi.error.badRequest('We failed to capture your feedback :(');
                    error.output.statusCode = 400;
                    reply(error);
                } else {
                    reply(feedback);
                }
            });
        },
        app: {
            name: 'admin'
        }
    }
};