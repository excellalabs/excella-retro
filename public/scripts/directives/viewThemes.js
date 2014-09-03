/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.directive('viewThemes', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/viewThemes.html',
        scope: {
            feedbackList: '=themes'
        }
    };
}]);

module.exports = app;