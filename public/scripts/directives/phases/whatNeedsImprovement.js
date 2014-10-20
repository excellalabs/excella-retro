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
        controller: ['$scope', 'boardService', '$rootScope', function($scope, boardService, $rootScope) {
            $scope.phases = constants.phases;
            $scope.isScrumMaster = $rootScope.isScrumMaster;

            $scope.sendThemes = function(){
                boardService.updateFeedback($scope.board.id, constants.feedbackTypes.whatNeedsImprovement, $scope.board.improveFeedback, $rootScope.scrumMasterKey).then(function(savedFeedback) {
                }, function(validation){
                    if(typeof validation !== "object"){
                        validation = [validation];
                    }
                    $scope.validation = validation;
                });
            };

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
