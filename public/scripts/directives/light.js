/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('light', [function() {
    "use strict";
    return {
        restrict: 'E',
        template: '<div style="width: {{size || 10}}px; height: {{size || 10}}px; border-radius: {{size || 10}}px; background: {{color}}; display: inline-block;"></div>',
        replace: true,
        scope: {
            size: '@',
            color: '@'
        },
        controller: ['$scope', function($scope){
            $scope.size = $scope.size || 10;
            $scope.color = $scope.color || '#f0ad4e';
        }]
    };
}]);

module.exports = app;