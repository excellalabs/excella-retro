var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.controller('BoardController', ['$scope', '$routeParams', 'userProvider', 'boardService', function($scope, $routeParams, userProvider, boardService) {
    $scope.boardId = $routeParams.id;

    boardService.getBoard($scope.boardId).then(function(board){
        $scope.board = board;
    });
}]);

module.exports = app;