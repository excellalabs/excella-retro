/* global require, module, exports */
/* jslint browser: true */

var angular = require('angular');
var constants = require('../../shared/constants/boardConstants');
require('./helpersModule');

var app = angular.module('remoteRetro.boardService', ['remoteRetro.helpers', 'ngCookies']);
app.factory('boardService', ['$http', '$q', 'userProvider', 'socket', '_', '$cookies',
        function($http, $q, userProvider, socket, _, $cookies){
            "use strict";
            var boardUrl = '../board';

            return {
                cacheBoardInfo: function(boardId, user, scrumMasterKey) {
                    var expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 3);

                    $cookies.putObject('excella-retro', { boardId: boardId, user: user, scrumMasterKey: scrumMasterKey},
                        { expires: expirationDate });
                },
                getCachedBoardInfo: function() {
                    return $cookies.getObject('excella-retro');
                },
                clearCache: function() {
                    $cookies.remove('excella-retro');
                },
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
                joinBoard: function (boardId, user, scrumMasterKey) {
                    var deferred = $q.defer();
                    socket.emit(constants.socketEmitters.joinBoard, boardId, user, scrumMasterKey);
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
                editFeedback: function (boardId, type, editedFeedback) {
                    var deferred = $q.defer();
                    $http.post(boardUrl + '/' + boardId + '/editFeedback/' + type, {editedFeedback: editedFeedback}).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                deleteFeedback: function (boardId, type, feedbackId) {
                    var deferred = $q.defer();
                    $http.delete(boardUrl + '/' + boardId + '/deleteFeedback/' + type + '/' + feedbackId).then(function (ctx) {
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
                updateFeedback: function(boardId, type, feedback, scrumMasterKey){
                    var deferred = $q.defer();
                    $http.put(boardUrl + '/' + boardId + '/setFeedback/' + type, { feedback: feedback, scrumMasterKey: scrumMasterKey }).then(function (ctx) {
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

