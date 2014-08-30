var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

var helpers = require('../../../shared/helpers');

app.controller('HomeController', ['$scope', 'userProvider', 'boardService', '$location', function($scope, userProvider, boardService, $location) {
    $scope.createBoard = function(){
        var validation = [];
        userProvider.setUser($scope.user, validation);
        $scope.validation = validation;

        if(validation.length){
            return;
        }

        var guid = helpers.guid();

        boardService.createBoard($scope.user, $scope.boardName, guid).then(function(board){
            $location.path('board/' + board.id);
        }, function(validation){
            if(typeof validation !== "object"){
                validation = [validation];
            }
            $scope.validation = validation;
        });
    };
}]);

module.exports = app;