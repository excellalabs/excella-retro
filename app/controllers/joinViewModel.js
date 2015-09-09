/* global require, module, exports */
/* jslint browser: true */
var angular = require('angular');
var app = require('./_module_init.js');

app.controller('JoinController', ['$scope', 'userProvider', 'boardService', '$location', '$rootScope', '$routeParams', '$modal',
    function($scope, userProvider, boardService, $location, $rootScope, $routeParams, $modal) {
    "use strict";

    $scope.joinBoard = function(){
        var isScrumMaster = false;

        var validation = [];
        userProvider.setUser($scope.user, isScrumMaster, validation);
        $scope.validation = validation;

        if(validation.length){
            return;
        }

        boardService.joinBoard($routeParams.id, $scope.user).then(function(success){
            if(success) {
                $rootScope.boardId = $routeParams.id;
                $rootScope.user = $scope.user;

                $location.path('retro/' + $routeParams.id);
            } else {
                $scope.validation = ['Can\'t join the retrospective.'];
            }
        }).catch(function() {
            $location.path('closed');
        });
    };

    var cache = boardService.getCachedBoardInfo();

    if(cache && cache.boardId) {
        if(cache.boardId === $routeParams.id) {
            if(cache.scrumMasterKey && cache.scrumMasterKey.length === 8) {
                $location.path('/');
            } else {
                $scope.user = cache.user;
                $scope.joinBoard();
            }
        }
    }
}]);

module.exports = app;