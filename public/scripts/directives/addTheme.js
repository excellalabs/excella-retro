/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.directive('addTheme', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/addTheme.html',
        scope: {
            boardId: '=boardId'
        },
        controller: function($scope, boardService) {
            $scope.sendTheme = function() {
                boardService.sendTheme($scope.boardId, $scope.theme).then(function(savedTheme) {
                    $scope.sendThemeForm.$setPristine();
                    $scope.theme = '';
                }, function(validation){
                    if(typeof validation !== "object"){
                        validation = [validation];
                    }
                    $scope.validation = validation;
                });
            };
        }
    };
}]);

module.exports = app;