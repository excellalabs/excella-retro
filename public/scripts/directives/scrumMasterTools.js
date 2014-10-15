/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
var constants = require('../../../shared/constants/boardConstants');

app.directive('scrumMasterTools', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/scrumMasterTools.html',
        scope: {
            board: '='
        },
        controller: function($scope, boardService) {
            $scope.phases = constants.board.phases;

            $scope.startFeedbackGathering = function () {
                $scope.board.phase = constants.phases.feedbackStarted;
                boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
            };

            $scope.stopFeedbackGathering = function () {
                $scope.board.phase = constants.phases.feedbackCompleted;
                boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
            };

            $scope.startThemeVoting = function () {
                $scope.board.phase = constants.phases.votingStarted;
                boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
            };

            $scope.stopThemeVoting = function () {
                $scope.board.phase = constants.phases.votingEnded;
                boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
            };
        }
    };
}]);

module.exports = app;
