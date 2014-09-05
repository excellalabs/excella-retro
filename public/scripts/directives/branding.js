/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.directive('branding', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/branding.html'
    };
}]);

module.exports = app;