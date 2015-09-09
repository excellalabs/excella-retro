/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('CloseViewModel', ['$scope', 'adminService', 'boardService',
    function($scope, adminService, boardService) {
        "use strict";
        $scope.isSaving = false;

        boardService.clearCache();

        $scope.canSubmit = function() {
            return !$scope.feedback || $scope.feedback.length === 0;
        };

        $scope.sendFeedback = function() {
          $scope.isSaving = true;
          adminService.sendFeedback($scope.feedback).then(function(feedback) {
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
    }]);

module.exports = app;