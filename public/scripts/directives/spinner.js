/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.directive('spinner', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/spinner.html',
        scope: {
            scale: '&',
            count: '&',
            thickness: '&',
            size: '&',
            interval: '&',
            color: '@'
        },
        controller: ['$scope', function($scope){
            $scope.scale = $scope.scale() || 1;
            $scope.count = $scope.count() || 12;
            $scope.thickness = $scope.thickness() || 10;
            $scope.fullSize = $scope.size() || 100;
            $scope.interval = $scope.interval() || 1;
            $scope.color = $scope.color || '#FF0000';

            $scope.size = $scope.fullSize * $scope.scale;
            $scope.fixPosition = ($scope.fullSize - $scope.size) / 2;
            $scope.thicknessPixels = $scope.size * $scope.thickness / 100;
            $scope.top = ($scope.size - $scope.thicknessPixels) / 2;
            $scope.armList = [];
            for(var i=0; i<$scope.count; i++){
                $scope.armList.push(i);
            }
        }]
    };
}]);

module.exports = app;