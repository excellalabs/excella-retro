/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('HomeController', ['$scope', 'userProvider', 'boardService', '$location', '$rootScope',
    function($scope, userProvider, boardService, $location, $rootScope) {
    "use strict";

    var cache = boardService.getCachedBoardInfo();

    if(cache && cache.boardId) {
        userProvider.setUser(cache.user);
        $location.path('retro/' + cache.boardId);
        $rootScope.scrumMasterKey = cache.scrumMasterKey;
        userProvider.setScrumMasterKey($rootScope.scrumMasterKey);
    }

    $scope.createBoard = function(){
        var isScrumMaster = true;

        var validation = [];
        var scrumMasterKey = userProvider.setUser($scope.user, isScrumMaster, validation);
        $rootScope.scrumMasterKey = scrumMasterKey;
        $scope.validation = validation;

        if(validation.length){
            return;
        }

        boardService.createBoard($scope.user, $scope.boardName, scrumMasterKey).then(function(board){
            $rootScope.boardId = board.id;
            boardService.cacheBoardInfo($rootScope.boardId, $scope.user, $rootScope.scrumMasterKey);
            $location.path('retro/' + board.id);
        }, function(validation){
            if(typeof validation !== "object"){
                validation = [validation];
            }
            $scope.validation = validation;
        });
    };

    $scope.joinBoard = function() {
        boardService.cacheBoardInfo($scope.boardId, $scope.user);
        $location.path('retro/' + $scope.boardId + '/join');
    };
}]);

module.exports = app;