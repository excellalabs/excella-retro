/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');
var helpers = require('../../../shared/helpers');

app.directive('viewThemes', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/viewThemes.html',
        scope: {
            themes: '=themes'
        },
        controller: function($scope, boardService) {
            $scope.allowedVotes = helpers.dotVotesAllowed($scope.themes.length);

            $scope.sendTheme = function() {
                boardService.sendTheme($scope.boardId, $scope.theme).then(function(savedTheme) {
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