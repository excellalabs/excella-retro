/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
var constants = require('../../../shared/constants/boardConstants');

app.controller('BoardController', ['$scope', '$routeParams', 'userProvider', 'boardService', '$location', '$rootScope', 'socket', function($scope, $routeParams, userProvider, boardService, $location, $rootScope, socket) {
    "use strict";
    $scope.phases = constants.phases;
    if(!$rootScope.boardId) {
        $location.path('#');
    }
    else {
        $scope.socketStatus = "Connecting...";
        var loadBoard = function() {
            boardService.getBoard($rootScope.boardId).then(function (board) {
                $scope.board = board;
                $scope.themes = board.themes;
                $scope.participants = board.participants;
                setIsUserScrumMaster(board.scrumMaster, board.scrumMasterKey);
                boardService.joinBoard($scope.boardId, $scope.user);

                $scope.participantMailToLink = function () {
                    return 'mailto:?subject=Join Retrospective: ' + $scope.board.title + '&body=' + encodeURIComponent('Please join my retrospective at:\n\n' + boardService.getJoinBoardUrl($scope.board.id));
                };

                $scope.participantJoinLink = function () {
                    return boardService.getJoinBoardUrl($scope.board.id);
                };

                $scope.scrumMasterAccessLink = function () {
                    return boardService.getScrumMasterAccessUrl($scope.board.id, $scope.board.scrumMasterKey);
                };

                // to be deleted
                $scope.boardPhaseDisplayName = function () {
                    switch ($scope.board.phase) {
                        case constants.phases.initial:
                            return 'Getting ready - Scrum Master will be initiating feedback gathering';
                        case constants.phases.feedbackStarted:
                            return 'Gathering feedback - Anonymously provide your feedback';
                        case constants.phases.feedbackCompleted:
                            return 'Creating themes - Scrum Master will be summarizing feedback as themes';
                        case constants.phases.votingStarted:
                            return 'Cast your votes - Anonymously cast your available votes ';
                        case constants.phases.votingEnded:
                            return 'Review prioritized themes - Scrum Master will end the retrospective';
                        default:
                            return '.';
                    }
                };

                $scope.refresh = function() {
                    loadBoard();
                };

                // to be deleted
                $scope.startFeedbackGathering = function () {
                    $scope.board.phase = constants.phases.feedbackStarted;
                    boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
                };

                // to be deleted
                $scope.stopFeedbackGathering = function () {
                    $scope.board.phase = constants.phases.feedbackCompleted;
                    boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
                };

                // to be deleted
                $scope.startThemeVoting = function () {
                    $scope.board.phase = constants.phases.votingStarted;
                    boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
                };

                // to be deleted
                $scope.stopThemeVoting = function () {
                    $scope.board.phase = constants.phases.votingEnded;
                    boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
                };
            });
        };

        var setIsUserScrumMaster = function (scrumMaster, boardsScrumMasterKey) {
            var user = userProvider.getUser();

            if (!user || user === '') {
                user = scrumMaster;
            }

            $scope.user = user;

            if ($rootScope.scrumMasterKey) {
                $rootScope.isScrumMaster = userProvider.isUserScrumMaster($rootScope.scrumMasterKey, boardsScrumMasterKey);
            } else {
                $rootScope.isScrumMaster = false;
            }
        };

        socket.on('error', function (error) {
            $scope.socketStatus = 2;
        });

        socket.on('reconnecting', function (attemptNo) {
            $scope.socketStatus = 1;
        });

        socket.on('reconnect', function (attemptNo) {
            $scope.socketStatus = 0;
            socket.emit('room', $rootScope.boardId, $scope.user);
        });

        socket.on('reconnect_failed', function () {
            $scope.socketStatus = 2;
        });

        socket.onConnect(function(){
            $scope.socketStatus = 0;

            socket.on('disconnect', function () {
                $scope.socketStatus = 2;
            });

        });

        socket.offOn(constants.socketEmitters.joined, function(participants){
            $scope.participants = participants;
        });

        socket.offOn(constants.socketEmitters.themeAdded, function(themes){
            $scope.themes = themes;
        });

        socket.offOn(constants.socketEmitters.refreshBoard, function(board){
            $scope.board = board;
        });

        //Load the board
        loadBoard();
    }
}]);

module.exports = app;