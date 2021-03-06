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
            board: '=',
            boardStats: '='
        },
        controller: ['$scope', 'boardService', '$element', '$modal', '$location', function($scope, boardService, $element, $modal, $location) {
            $scope.phases = constants.phases;
            var index = $scope.board ? _.findIndex(constants.workflow, {phase: $scope.board.phase }) : 0;
            $scope.actionText = constants.workflow[index].actionText;

            if($scope.board) {
                $scope.boardId = $scope.board.id;
            } else {
                $scope.boardId = $rootScope.boardId;
            }

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

            $scope.$watch('boardStats', function(boardStats) {
                $scope.$emit('appendToBody', boardStats.feedback);
            });

            $scope.viewLiveFeedback = function () {
                $rootScope.refreshBoard(function() {
                    setTimeout(function() {
                        var modalInstance = $modal.open({
                            templateUrl: 'templates/modal.html',
                            controller: 'ModalInstanceController',
                            size: 'lg',
                            scope: $scope,
                            resolve: {
                                title: function() { return "Live Feedback"; },
                                body: function() { return "Waiting for feedback..."; },
                                feedbackList: function() { return $scope.board.wellFeedback.concat($scope.board.improveFeedback); },
                                hasCancel: function() { return false; }
                            }
                        });

                        modalInstance.result.then(function (selectedItem) {

                        });
                    });
                });
            }

            $scope.closeRetro = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'templates/modal.html',
                    controller: 'ModalInstanceController',
                    size: 'sm',
                    scope: $scope,
                    resolve: {
                        title: function() { return "Close Retrospective?"; },
                        body: function() { return "This will permanently delete your retrospective. You will lose access to your data. Select OK to continue."; },
                        hasCancel: function() { return true; },
                        feedbackList: function() { return null;}
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
