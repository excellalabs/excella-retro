var app = require('./_module_init.js');
var helpers = require('../../../shared/helpers');
require('../../bower_components/angular/angular');

app.controller('HomeController', ['$scope', 'userProvider', 'boardRetriever', function($scope, userProvider, boardRetriever) {
    $scope.createBoard = function(){
        var validation = [];
        userProvider.setUser($scope.user, validation);
        $scope.validation = validation;

        if(validation.length){
            return;
        }

        var guid = helpers.guid();

        boardRetriever.createBoard($scope.user, $scope.boardName, guid).then(function(board){
            //$rootScope.boardId = board.id;
            alert(board.id);

            //$state.go('board.edit', { boardId: board._id });
        }, function(validation){
            if(typeof validation !== "object"){
                validation = [validation];
            }
            $scope.validation = validation;
        });
    };
}]);

module.exports = app;