/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('JoinController', ['$scope', 'userProvider', 'boardService', '$location', '$rootScope', '$routeParams', function($scope, userProvider, boardService, $location, $rootScope, $routeParams) {
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
                $location.path('retro');
            } else {
                $scope.validation = ['Can\'t join the board'];
            }
        }, function(validation){
            if(typeof validation !== "object"){
                validation = [validation];
            }
            $scope.validation = validation;
        });
    };
}]);

module.exports = app;