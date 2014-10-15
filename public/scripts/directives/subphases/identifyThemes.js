/* global require, module, exports */
/* jslint browser: true */

var app = require('./../_module_init.js');
var constants = require('../../../../shared/constants/boardConstants');

app.directive('identifyThemes', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/identifyThemes.html',
        scope: {
            themes: '=themes'
        },
        controller: ['$scope', function($scope) {
        }]
    };
}]);

module.exports = app;
