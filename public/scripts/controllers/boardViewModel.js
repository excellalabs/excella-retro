/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
var constants = require('../../../shared/constants/boardConstants');

app.controller('BoardController', ['$scope', '$routeParams', 'userProvider', 'boardService', '$location', '$rootScope', 'socket', '$modal', function($scope, $routeParams, userProvider, boardService, $location, $rootScope, socket, $modal) {
    "use strict";
    $scope.phases = constants.phases;
    if(!$rootScope.boardId) {
        $location.path('/closed');
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
            }).catch(function() {
                $location.path('/closed');
            });
        }

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

        socket.offOn(constants.socketEmitters.boardClosed, function(){
            $rootScope.boardId = null;
            $rootScope.scrumMasterKey = null;
            $scope.board = null;

            var modalInstance = $modal.open({
                templateUrl: 'templates/modal.html',
                controller: 'ModalInstanceController',
                size: 'sm',
                resolve: {
                    title: function() { return "Retrospective Has Been Closed"; },
                    body: function() { return "Your Scrum Master has closed this retrospective. You no longer have access to its contents."; },
                    hasCancel: function() { return false; }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $location.path('/closed');
            });
        });

        socket.offOn(constants.socketEmitters.refreshBoard, function(board){
            $scope.board = board;
        });

        socket.offOn(constants.socketEmitters.wellFeedbackEdited, function(wellFeedback){
            $scope.board.wellFeedback = wellFeedback;
        });

        socket.offOn(constants.socketEmitters.improveFeedbackEdited, function(improveFeedback){
            $scope.board.improveFeedback = improveFeedback;
        });

        socket.offOn(constants.socketEmitters.actionItemsEdited, function(actionItems){
            $scope.board.actionItems = actionItems;
        });

        //Load the board
        loadBoard();
    }
}]);

module.exports = app;