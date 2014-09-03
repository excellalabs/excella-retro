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

            var usedVotes = 0;

            function canUpVote() {
                return usedVotes <= $scope.allowedVotes;
            }

            function canDownVote(themeVotes) {
                return usedVotes > 0 && themeVotes > 0;
            }

            $scope.upVote = function(themeId) {
                if(canUpVote()) {
                    var theme = _.findWhere($scope.themes, {id: themeId});
                    theme.votes++;
                    usedVotes++;
                    $scope.$apply();
                }
            };

            $scope.downVote = function(themeId) {
                var theme = _.findWhere($scope.themes, {id: themeId});
                if(canDownVote(theme.votes)) {
                    theme.votes--;
                    usedVotes--;
                    $scope.$apply();
                }
            };

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