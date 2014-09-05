/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.directive('connectionStatus', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/connectionStatus.html',
        replace: true,
        scope: {
            status: '=status',
            showOnConnected: '@'
        },
        controller: ['$scope', function($scope){
            $scope.showOnConnected = !!$scope.showOnConnected && $scope.showOnConnected !== 'false';
        }]
    };
}]);

module.exports = app;