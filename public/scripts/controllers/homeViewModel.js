/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('HomeController', ['$scope', 'userProvider', 'boardService', '$location', '$rootScope', function($scope, userProvider, boardService, $location, $rootScope) {
    "use strict";
    $scope.createBoard = function(){
        var isScrumMaster = true;

        var validation = [];
        var scrumMasterKey = userProvider.setUser($scope.user, isScrumMaster, validation);
        $rootScope.scrumMasterKey= scrumMasterKey;
        $scope.validation = validation;

        if(validation.length){
            return;
        }

        boardService.createBoard($scope.user, $scope.boardName, scrumMasterKey).then(function(board){
            $rootScope.boardId = board.id;
            $location.path('board');
        }, function(validation){
            if(typeof validation !== "object"){
                validation = [validation];
            }
            $scope.validation = validation;
        });
    };
}]);

module.exports = app;