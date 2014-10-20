/* global require, module, exports */
/* jslint browser: true */

var app = require('./../_module_init.js');
var constants = require('../../../../shared/constants/boardConstants');

app.directive('actionItems', [function() {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/actionItems.html',
        scope: {
            board: '='
        },
        controller: ['$scope', function($scope) {
            $scope.phases = constants.phases;

            $scope.addActionItem = function(actionItemGroup, newActionItem) {
              var actionItem = $scope.newActionItem;

              if(actionItem && actionItem.length > 0) {
                  if(!actionItemGroup[1]) {
                      actionItemGroup[1] = [];
                  }
                  actionItemGroup[1].push(actionItem);
              }

              $scope.newActionItem = "";
            };
        }]
    };
}]);

module.exports = app;
