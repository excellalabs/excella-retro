require('../bower_components/angular/angular');

'use strict';
var app = angular.module('remoteRetro.directives', [])
    .directive('errorField', [function() {
        return {
            restrict: 'E',
            templateUrl: '/templates/errorField.html',
            scope: {
                errors: '=model'
            }
        }
    }]);

module.exports = app;