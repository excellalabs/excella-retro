/* jslint node: true */
"use strict";
var db = require('./database');

var feedbackList = 'feedback-list';

function ensureListExists(callback) {
        db.get(feedbackList, function(err, list) {
            if (err) {
                db.put(feedbackList, [], { sync: true }, callback);
            } else {
                callback(err, list);
            }
        });
    };

module.exports = {
    addFeedback: function(feedback, callback) {
        ensureListExists(function (err, list) {
            list.push(feedback);
            db.put(feedbackList, list, callback);
        });
    }
};