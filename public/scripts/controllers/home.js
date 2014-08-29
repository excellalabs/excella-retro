var app = require('./_module_init.js');
app.controller('HomeController', ['$scope', 'userProvider', 'boardRetriever', function($scope, userProvider, boardRetriever) {
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
}]);

module.exports = app;