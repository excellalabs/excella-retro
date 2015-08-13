/* global require, module, exports */
/* jslint browser: true */

var app = require('./../_module_init.js');
var constants = require('../../../shared/constants/boardConstants');

app.directive('identifyThemes', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/identifyThemes.html',
        scope: {
            themes: '=themes',
            boardId: '=boardId'
        },
        controller: ['$scope', '$root', 'boardService', function($scope, boardService) {
            $scope.changeThemes = function(){
                boardService.changeThemes($scope.boardId, $scope.themes)
                    .catch(function(validation){
                        if(typeof validation !== "object"){
                            validation = [validation];
                        }
                        $scope.validation = validation;
                    });
            };
        }]
    };
}]);

module.exports = app;
