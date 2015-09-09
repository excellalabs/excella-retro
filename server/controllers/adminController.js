/* jslint node: true */
"use strict";

var admin = require('../models/admin');
var Boom = require('boom');

module.exports = {
    addFeedback: {
        handler: function (request, reply) {
            admin.addFeedback(request.payload.feedback, function (err, feedback) {
                if (err) {
                    reply(Boom.badRequest('We failed to capture your feedback :('));
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