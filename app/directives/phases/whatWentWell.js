/* global require, module, exports */
/* jslint browser: true */

var app = require('./../_module_init.js');
var constants = require('../../../shared/constants/boardConstants');

app.directive('whatWentWell', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/whatWentWell.html',
        scope: {
            board: '='
        },
        controller: ['$scope', 'boardService', '$rootScope', function($scope, boardService, $rootScope) {
            $scope.phases = constants.phases;
            $scope.isScrumMaster = $rootScope.isScrumMaster;

            $scope.whatWentWell = $scope.board.id === 'excv2016' ? 'What was your impact' : 'What Went Well';

            $scope.sendThemes = function(){
                boardService.updateFeedback($scope.board.id, constants.feedbackTypes.whatWentWell, $scope.board.wellFeedback, $rootScope.scrumMasterKey).then(function(savedFeedback) {
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
