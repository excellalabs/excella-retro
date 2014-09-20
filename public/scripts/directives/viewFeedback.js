/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('viewFeedback', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/viewFeedback.html',
        scope: {
            feedbackList: '=feedback',
            feedbackContext: '@feedbackContext'
        }
    };
}]);

module.exports = app;