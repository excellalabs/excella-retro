var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.controller('JoinController', ['$scope', 'userProvider', 'boardService', '$location', '$rootScope', '$routeParams', function($scope, userProvider, boardService, $location, $rootScope, $routeParams) {
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
                $location.path('board');
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