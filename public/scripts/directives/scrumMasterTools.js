/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
var constants = require('../../../shared/constants/boardConstants');

app.directive('scrumMasterTools', ['$rootScope', function($rootScope) {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/scrumMasterTools.html',
        scope: {
            board: '='
        },
        controller: function($scope, boardService) {
            $scope.phases = constants.phases;

            $scope.participantMailToLink = function (boardId, boardTitle) {
                return 'mailto:?subject=Join Retrospective: ' + boardTitle + '&body=' + encodeURIComponent('Please join my retrospective at:\n\n' + boardService.getJoinBoardUrl(boardId));
            };

            $scope.participantJoinLink = function (boardId) {
                return boardService.getJoinBoardUrl(boardId);
            };

            $scope.scrumMasterAccessLink = function (boardId, scrumMasterKey) {
                return boardService.getScrumMasterAccessUrl(boardId, scrumMasterKey);
            };

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
