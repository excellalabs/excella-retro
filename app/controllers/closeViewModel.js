/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('CloseViewModel', ['$scope', 'adminService', 'boardService',
    function($scope, adminService, boardService) {
        "use strict";
        $scope.isSaving = false;

        $('#twitter').append("<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>");

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