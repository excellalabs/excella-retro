/* global require, module, exports */
/* jslint browser: true */

var app = require('./../_module_init.js');
var constants = require('../../../../shared/constants/boardConstants');

app.directive('whatWentWell', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/whatWentWell.html',
        scope: {
            board: '='
        },
        controller: ['$scope', 'boardService', '$rootScope', function($scope, boardService, $rootScope) {
            $scope.phases = constants.phases;
            $scope.isScrumMaster = $rootScope.isScrumMaster;
        }]
    };
}]);

module.exports = app;
