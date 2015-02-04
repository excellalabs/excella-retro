/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('angular-xeditable');

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});

app.directive('viewFeedback', [function () {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/viewFeedback.html',
        scope: {
            boardId: '=boardId',
            type: '=',
            feedbackList: '=feedback',
            feedbackContext: '@feedbackContext'
        },
        controller: function ($scope, boardService) {
            $scope.editFeedback = function () {
                var editedFeedback = {
                    id: this.feedback.id,
                    feedback: this.editFeedbackForm.$data.feedback
                };
                boardService.editFeedback($scope.boardId, $scope.type, editedFeedback);
            };
            $scope.deleteFeedback = function (index) {
                boardService.deleteFeedback($scope.boardId, $scope.type, this.feedback.id).then(function (validation) {
                    if (validation) {
                        $scope.feedbackList.splice(index, 1);
                    }
                });
            };
        }
    };
}]);

module.exports = app;