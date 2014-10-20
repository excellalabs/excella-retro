/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
var constants = require('../../../shared/constants/boardConstants');

app.directive('scrumMasterTools', ['$rootScope', '_', function($rootScope, _) {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/scrumMasterTools.html',
        scope: {
            board: '='
        },
        controller: ['$scope', 'boardService', '$element', function($scope, boardService, $element) {
            $scope.phases = constants.phases;
            $scope.actionText = constants.workflow[0].actionText;

            $scope.participantMailToLink = function (boardId, boardTitle) {
                return 'mailto:?subject=Join Retrospective: ' + boardTitle + '&body=' + encodeURIComponent('Please join my retrospective at:\n\n' + boardService.getJoinBoardUrl(boardId));
            };

            $scope.participantJoinLink = function (boardId) {
                return boardService.getJoinBoardUrl(boardId);
            };

            $scope.scrumMasterAccessLink = function (boardId, scrumMasterKey) {
                return boardService.getScrumMasterAccessUrl(boardId, scrumMasterKey);
            };

            $scope.goToNextPhase = function () {
                var currIdx = _.findIndex(constants.workflow, {phase: $scope.board.phase });
                if(currIdx + 1 < constants.workflow.length) {
                    $scope.board.phase = constants.workflow[currIdx + 1].phase;
                    $scope.actionText = constants.workflow[currIdx + 1].actionText;
                    boardService.putPhase($rootScope.boardId, $scope.board.phase, $rootScope.scrumMasterKey);
                }
            };
<<<<<<< HEAD

            var collapsible = $element.find(".collapse");
            var collapsor = $element.find('#collapsor');

            collapsor.click(function() {
                if(collapsible.hasClass("out")) {
                    collapsible.addClass("in");
                    collapsible.removeClass("out");
                } else {
                    collapsible.addClass("out");
                    collapsible.removeClass("in");
                }
            });
        }
=======
        }]
>>>>>>> be4299795c475b1b2c7c2f08a30238bdbcd533ce
    };
}]);

module.exports = app;
