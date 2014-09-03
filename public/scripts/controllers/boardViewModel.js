/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.controller('BoardController', ['$scope', '$routeParams', 'userProvider', 'boardService', '$location', '$rootScope', 'socket', function($scope, $routeParams, userProvider, boardService, $location, $rootScope, socket) {
    "use strict";
    if(!$rootScope.boardId) {
        $location.path('#');
    }
    else {
        boardService.getBoard($rootScope.boardId).then(function (board) {
            $scope.board = board;
            setIsUserScrumMaster(board.scrumMaster, board.scrumMasterKey);
            $scope.participantMailToLink = function () {
                return 'mailto:?subject=Join Retrospective: ' + $scope.board.title + '&body=' + encodeURIComponent('Please join my retrospective at:\n\n' + boardService.getJoinBoardUrl(board.id));
            };
            $scope.scrumMasterAccessLink = function () {
                return boardService.getScrumMasterAccessUrl(board.id, board.scrumMasterKey);
            };
            $scope.boardPhaseDisplayName = function () {
                switch (board.phase) {
                    case 'initial':
                        return 'Getting ready';
                    case 'feedback-completed':
                        return 'Creating themes';
                    default:
                        return '.';
                }
            };
        });

        var setIsUserScrumMaster = function (scrumMaster, boardsScrumMasterKey) {
            var user = userProvider.getUser();

            if (!user || user === '') {
                user = scrumMaster;
            }

            $scope.user = user;

            if ($rootScope.scrumMasterKey) {
                $scope.isScrumMaster = userProvider.isUserScrumMaster($rootScope.scrumMasterKey, boardsScrumMasterKey);
            } else {
                $scope.isScrumMaster = false;
            }
        };

        boardService.getBoardParticipants($rootScope.boardId).then(function(participants){
            $scope.participants = participants;
        });

        $scope.startFeedbackGathering = function(){
            $scope.board.phase = 'feedback-started';
            boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
        };

        $scope.stopFeedbackGathering = function(){
            $scope.board.phase = 'feedback-completed';
            boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
        };

        socket.onConnect(function(){
            socket.emit('room', $rootScope.boardId);
        });

        socket.offOn('joined', function(participants){
            $scope.participants = participants;
        });

        socket.offOn('boardPhase', function(phase){
            $scope.board.phase = phase;
        });
    }
}]);

module.exports = app;