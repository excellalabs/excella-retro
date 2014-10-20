/* global require, module, exports */
/* jslint browser: true */

var angular = require('angular');
var constants = require('../../../shared/constants/boardConstants');
require('./helpersModule');

var app = angular.module('remoteRetro.boardService', ['remoteRetro.helpers']);
app.factory('boardService', ['$http', '$q', 'userProvider', 'socket', '_',
        function($http, $q, userProvider, socket, _){
            "use strict";
            var boardUrl = '../board';

            return {
                createBoard: function (user, boardName, scrumMasterKey) {
                    var deferred = $q.defer();
                    $http.post(boardUrl, { user: user, boardName: boardName, scrumMasterKey: scrumMasterKey }).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                getBoard: function (boardId) {
                    var deferred = $q.defer();
                    $http.get(boardUrl + '/' + boardId).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                getBoardParticipants: function (boardId) {
                    var deferred = $q.defer();
                    $http.get(boardUrl + '/' + boardId + '/participants').then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                joinBoard: function (boardId, user) {
                    var deferred = $q.defer();
                    socket.emit(constants.socketEmitters.joinBoard, boardId, user);
                    var successCallback = function(requestName, username){
                        if(requestName !== constants.socketEmitters.joinBoard){ return; }
                        socket.off(constants.socketEmitters.joinSuccess, successCallback);
                        socket.off(constants.socketEmitters.joinError, failureCallback);
                        deferred.resolve(username);
                    };
                    var failureCallback = function(requestName, error){
                        if(requestName !== constants.socketEmitters.joinBoard){ return; }
                        socket.off(constants.socketEmitters.joinSuccess, successCallback);
                        socket.off(constants.socketEmitters.joinError, failureCallback);
                        deferred.reject(error);
                    };
                    socket.on(constants.socketEmitters.joinSuccess, successCallback);
                    socket.on(constants.socketEmitters.joinError, failureCallback);
                    return deferred.promise;
                },
                closeBoard: function(boardId, scrumMasterKey) {
                    var deferred = $q.defer();
                    $http.delete(boardUrl + '/' + boardId + '/' + scrumMasterKey).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                sendFeedback: function (boardId, type, feedback) {
                    var deferred = $q.defer();
                    $http.post(boardUrl + '/' + boardId + '/feedback/' + type, {feedback: feedback}).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                changeThemes: function(boardId, themes){
                    var deferred = $q.defer();
                    $http.post(boardUrl + '/' + boardId + '/themes', {themes: themes}).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                updateFeedback: function(boardId, type, wellFeedback, scrumMasterKey){
                    var deferred = $q.defer();
                    $http.put(boardUrl + '/' + boardId + '/setFeedback/' + type, { feedback: wellFeedback, scrumMasterKey: scrumMasterKey }).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                sendVotes: function (boardId, themeIdVoteCollection) {
                    var deferred = $q.defer();
                    $http.put(boardUrl + '/' + boardId + '/addVotes', { themeIdVoteCollection: themeIdVoteCollection }).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                putPhase: function(boardId, phase, scrumMasterKey){
                    var deferred = $q.defer();
                    $http.put(boardUrl + '/' + boardId + '/phase', { phase: phase, scrumMasterKey: scrumMasterKey }).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                getJoinBoardUrl: function (boardId) {
                    return window.location.origin + '/#/retro/' + boardId + '/join';
                },
                getScrumMasterAccessUrl: function (boardId, scrumMasterKey) {
                    return window.location.origin + '/#/retro/' + boardId + '/' + scrumMasterKey;
                },
                save: function (board) {
                    var deferred = $q.defer();
                    $http.put(boardUrl + board._id, { user: userProvider.getUser(), board: board }).then(function (ctx) {
                        _.extend(board, ctx.data);
                        deferred.resolve(board);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                }
            };
        }]);

module.exports = app;

