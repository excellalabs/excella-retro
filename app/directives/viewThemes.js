/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('viewThemes', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/viewThemes.html',
        scope: {
            themes: '=themes',
            boardId: '=boardId'
        },
        controller: function($scope, boardService, socket, _, helpers) {
            var allowedVotes = 0;

            $scope.$watchCollection('themes', function() {
                $scope.unusedVotes = allowedVotes = helpers.dotVotesAllowed($scope.themes.length);
            });

            $scope.clearVotes = function() {
                $scope.unusedVotes = allowedVotes;

                $scope.themes = $scope.themes.map(function(theme) { theme.votes = 0; return theme; });
            };

            $scope.canVote = true; //set to true by default for people who join later

            function canUpVote() {
                return $scope.canVote && $scope.unusedVotes > 0;
            }

            function canDownVote(themeVotes) {
                return $scope.canVote && $scope.unusedVotes <= allowedVotes && themeVotes > 0;
            }

            $scope.upVote = function(themeId) {
                if(canUpVote()) {
                    var theme = _.findWhere($scope.themes, {id: themeId});
                    theme.votes++;
                    $scope.unusedVotes--;
                }
            };

            $scope.downVote = function(themeId) {
                var theme = _.findWhere($scope.themes, {id: themeId});
                if(canDownVote(theme.votes)) {
                    theme.votes--;
                    $scope.unusedVotes++;
                }
            };

            $scope.sendTheme = function() {
                boardService.sendTheme($scope.boardId, $scope.theme).then(function(savedTheme) {
                    $scope.theme = savedTheme;
                }, function(validation){
                    if(typeof validation !== "object"){
                        validation = [validation];
                    }
                    $scope.validation = validation;
                });
            };

            socket.offOn('begin-voting', function (board) {
                $scope.canVote = true;
            });

            socket.offOn('collect-votes', function () {
                $scope.canVote = false;

                var themeIdVoteCollection = {};

                _.each($scope.themes, function(theme) {
                    if(theme.votes > 0) {
                        themeIdVoteCollection[theme.id] = theme.votes;
                    }
                });

                boardService.sendVotes($scope.boardId, themeIdVoteCollection);

            });
        }
    };
}]);

module.exports = app;