/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('addFeedback', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/addFeedback.html',
        scope: {
            boardId: '=boardId',
            feedbackContext: '@',
            type:'@'
        },
        controller: function($scope, boardService) {
            $scope.userFeedback = [];
            $scope.isSaving = false;

            $scope.canSubmit = function() {
                return !$scope.feedback || $scope.feedback.length === 0;
            };

            $scope.sendFeedback = function() {
                $scope.isSaving = true;
                boardService.sendFeedback($scope.boardId, $scope.type, [$scope.feedback]).then(function(savedFeedback) {
                    $scope.userFeedback.push(savedFeedback);
                    $scope.sendFeedbackForm.$setPristine();
                    $scope.feedback = '';
                    $scope.isSaving = false;
                }, function(validation){
                    if(typeof validation !== "object"){
                        validation = [validation];
                    }
                    $scope.validation = validation;
                });
            };
        }
    };
}]);

module.exports = app;