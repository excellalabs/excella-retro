var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.controller('HomeController', ['$scope', 'userProvider', 'boardService', '$location', function($scope, userProvider, boardService, $location) {
    $scope.createBoard = function(){
        var isScrumMaster = true;

        var validation = [];
        var scrumMasterKey = userProvider.setUser($scope.user, isScrumMaster, validation);
        $scope.validation = validation;

        if(validation.length){
            return;
        }

        boardService.createBoard($scope.user, $scope.boardName, scrumMasterKey).then(function(board){
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