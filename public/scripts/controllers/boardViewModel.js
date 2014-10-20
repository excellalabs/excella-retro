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

                $scope.refresh = function() {
                    loadBoard();
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
                userProvider.setScrumMasterKey($rootScope.scrumMasterKey);
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

        socket.offOn(constants.socketEmitters.themesEdited, function(themes){
            $scope.themes = themes;
        });

        socket.offOn(constants.socketEmitters.refreshBoard, function(board){
            $scope.board = board;
        });

        socket.offOn(constants.socketEmitters.wellFeedbackEdited, function(wellFeedback){
            $scope.board.wellFeedback = wellFeedback;
        });

        //Load the board
        loadBoard();
    }
}]);

module.exports = app;