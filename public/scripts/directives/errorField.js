/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');


app.directive('errorField', [function() {
    "use strict";
    return {
            restrict: 'E',
            templateUrl: 'templates/directives/errorField.html',
            scope: {
                errors: '=model'
            }
        };
    }]);

module.exports = app;