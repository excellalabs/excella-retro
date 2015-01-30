/* global require, module, exports */
/* jslint browser: true */
'use strict';

var app = require('./_module_init.js');

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

app.directive('viewFeedback', [function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/viewFeedback.html',
        scope: {
            feedbackList: '=feedback',
            tmp: '@tmp',
            feedbackContext: '@feedbackContext'
        }
    };
}]);

module.exports = app;