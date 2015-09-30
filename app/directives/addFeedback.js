/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('addFeedback', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/addFeedback.html',
        scope: {
            board: '=',
            isScrumMaster: '=',
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
                boardService.sendFeedback($scope.board.id, $scope.type, [$scope.feedback]).then(function(savedFeedback) {
                    savedFeedback.isOwn = true;
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

            $scope.getUserFeedback = function() {
                if($scope.isScrumMaster) {
                    switch($scope.type) {
                        case 'well':
                            return _.map($scope.board.wellFeedback, selectOwn);
                        case 'improve':
                            return _.map($scope.board.improveFeedback, selectOwn);
                    }
                }

                return $scope.userFeedback;
            };

            function selectOwn(feedbackItem) {
                feedbackItem.isOwn = _.some($scope.userFeedback, function(userFeedback) {
                    return userFeedback.id === feedbackItem.id;
                });
                return feedbackItem;
            }
        }
    };
}]);

module.exports = app;