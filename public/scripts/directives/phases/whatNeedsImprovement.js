/* global require, module, exports */
/* jslint browser: true */

var app = require('./../_module_init.js');
var constants = require('../../../../shared/constants/boardConstants');

app.directive('whatNeedsImprovement', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/whatNeedsImprovement.html',
        scope: {
            board: '='
        },
        controller: ['$scope', 'boardService', function($scope, boardService) {
            $scope.phases = constants.phases;

            $scope.sendFeedback = function() {
                boardService.sendFeedback($scope.boardId, $scope.feedback).then(function(savedFeedback) {
                    $scope.userFeedback.push(savedFeedback);
                    $scope.sendFeedbackForm.$setPristine();
                    $scope.feedback = '';
                }, function(validation){
                    if(typeof validation !== "object"){
                        validation = [validation];
                    }
                    $scope.validation = validation;
                });
            };
        }]
    };
}]);

module.exports = app;
