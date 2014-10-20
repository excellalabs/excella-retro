/* global require, module, exports */
/* jslint browser: true */

var app = require('./../_module_init.js');
var constants = require('../../../../shared/constants/boardConstants');

app.directive('actionItems', ['boardService', function(boardService) {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/actionItems.html',
        scope: {
            board: '='
        },
        controller: ['$scope', function($scope) {
            $scope.phases = constants.phases;

            $scope.addActionItem = function(actionItemGroup) {
              var actionItem = $scope.newActionItem;

              if(actionItem && actionItem.length > 0) {
                  if(!actionItemGroup[1]) {
                      actionItemGroup[1] = [];
                  }
                  actionItemGroup[1].push(actionItem);

                  boardService.updateFeedback($scope.board.id, constants.feedbackTypes.actionItems, $scope.board.actionItems, $rootScope.scrumMasterKey);
              }

              $scope.newActionItem = "";
            };
        }]
    };
}]);

module.exports = app;
