var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.controller('BoardController', ['$scope', '$routeParams', 'userProvider', 'boardRetriever', function($scope, routeParams, userProvider, boardRetriever) {
    $scope.boardId = $routeParams.id;


    boardRetriever.getBoard(boardId).then(function(board){

    });
}]);

module.exports = app;