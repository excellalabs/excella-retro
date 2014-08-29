define(['angular'], function(angular) {
    'use strict';
    angular.module('remoteRetro.directives', [])
        .directive('errorField', [function() {
            return {
                restrict: 'E',
                templateUrl: '/static/templates/errorField.html',
                scope: {
                    errors: '=model'
                }
            }
        }]);
});