/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
var constants = require('../../shared/constants/boardConstants');

app.directive('scrumMasterTools', ['$rootScope', '_', '$filter', function($rootScope, _, $filter) {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'templates/directives/scrumMasterTools.html',
        scope: {
            board: '='
        },
        controller: ['$scope', 'boardService', '$element', '$modal', '$location', function($scope, boardService, $element, $modal, $location) {
            $scope.phases = constants.phases;
            var index = $scope.board ? _.findIndex(constants.workflow, {phase: $scope.board.phase }) : 0;
            $scope.actionText = constants.workflow[index].actionText;

            $scope.boardId = $scope.board.id;

            $scope.$watch('boardId', function(boardId){
                $scope.boardId = $filter('uppercase')(boardId);
            });

            $scope.participantMailToLink = function (boardId, boardTitle) {
                boardTitle = window.escape(boardTitle);

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

            $scope.closeRetro = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'templates/modal.html',
                    controller: 'ModalInstanceController',
                    size: 'sm',
                    resolve: {
                        title: function() { return "Close Retrospective?"; },
                        body: function() { return "This will permanently delete your retrospective. You will lose access to your data. Select OK to continue."; },
                        hasCancel: function() { return true; }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    if(selectedItem === "OK") {
                        boardService.closeBoard($scope.board.id, $rootScope.scrumMasterKey, function() {
                            this.clearCache();
                        });
                    }
                });
            };

            var collapsible = $element.find(".collapse");
            var collapsor = $element.find('#collapsor');

            collapsor.on('click', function() {
                if(collapsible.hasClass("out")) {
                    collapsible.addClass("in");
                    collapsible.removeClass("out");
                    collapsor.addClass("glyphicon-chevron-up");
                    collapsor.removeClass("glyphicon-chevron-down");
                } else {
                    collapsible.addClass("out");
                    collapsible.removeClass("in");
                    collapsor.addClass("glyphicon-chevron-down");
                    collapsor.removeClass("glyphicon-chevron-up");
                }
            });
        }]
    };
}]);

module.exports = app;
