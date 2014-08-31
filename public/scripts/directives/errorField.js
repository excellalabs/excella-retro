var app = require('./_module_init.js');
require('../../bower_components/angular/angular');


'use strict';
app.directive('errorField', [function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/directives/errorField.html',
            scope: {
                errors: '=model'
            }
        }
    }]);

module.exports = app;