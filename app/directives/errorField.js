/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

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