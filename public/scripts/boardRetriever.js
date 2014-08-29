'use strict';

require('../bower_components/angular/angular');
var _ = require('../bower_components/lodash/dist/lodash');

var app = angular.module('remoteRetro.boardRetriever', []);
app.factory('boardRetriever', ['$http', '$q', 'userProvider',
        function($http, $q, userProvider){
            var boardUrl = '../board';
            function decorateBoard(board){
                board.userIsScrumMaster = function(){
                    return userProvider.getUserHash() == this.scrumMasterHash;
                };
                board.save = function(){
                    return retriever.save(this);
                };
                return board;
            }

            var retriever = {
                createBoard: function(user, boardName, guid){
                    var deferred = $q.defer();
                    $http.post(boardUrl, { user: user, boardName: boardName, guid: guid }).then(function(ctx){
                        deferred.resolve(decorateBoard(ctx.data));
                    }, function(ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                getBoard: function(boardId){
                    var deferred = $q.defer();
                    $http.get(boardUrl + boardId).then(function(ctx){
                        deferred.resolve(decorateBoard(ctx.data));
                    }, function(ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                getBoardOrUndefined: function(boardId){
                    var deferred = $q.defer();
                    $http.get(boardUrl + boardId).then(function(ctx){
                        deferred.resolve(decorateBoard(ctx.data));
                    }, function(ctx) {
                        deferred.resolve(undefined);
                    });
                    return deferred.promise;
                },
                getAllBoards: function(){
                    var deferred = $q.defer();
                    $http.get(boardUrl).then(function(ctx){
                        _.each(ctx.data, decorateBoard)
                        deferred.resolve(ctx.data);
                    }, function(ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                },
                save: function(board){
                    var deferred = $q.defer();
                    $http.put(boardUrl + board._id, { user: userProvider.getUser(), board: board }).then(function(ctx){
                        _.extend(board, ctx.data);
                        deferred.resolve(board);
                    }, function(ctx){
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                }
            };
            return retriever;
        }]);

module.exports = app;

