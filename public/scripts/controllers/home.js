var userProvider = require('../userProvider.js')
var boardRetriever = require('../boardRetriever.js');

var HomeController = function($scope) {
    $scope.createBoard = function(){
        var validation = [];
        userProvider.setUser($scope.user, validation);
        $scope.validation = validation;

        if(validation.length){
            return;
        }

        boardRetriever.createBoard($scope.user).then(function(board){
            $rootScope.boardId = board._id;
            $state.go('board.edit', { boardId: board._id });
        }, function(validation){
            if(typeof validation !== "object"){
                validation = [validation];
            }
            $scope.validation = validation;
        });
    };
};

var module = require('./_module_init.js');
module.controller('HomeController', ['$scope', HomeController]);