/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('HomeController', ['$scope', 'userProvider', 'boardService', '$location', '$rootScope', '$modal', function($scope, userProvider, boardService, $location, $rootScope, $modal) {
    "use strict";

    $scope.createBoard = function(){
        var isScrumMaster = true;

        var validation = [];
        var scrumMasterKey = userProvider.setUser($scope.user, isScrumMaster, validation);
        $rootScope.scrumMasterKey= scrumMasterKey;
        $scope.validation = validation;

        if(validation.length){
            return;
        }

        boardService.createBoard($scope.user, $scope.boardName, scrumMasterKey).then(function(board){
            $rootScope.boardId = board.id;

            var modalInstance = $modal.open({
                templateUrl: 'templates/modal.html',
                controller: 'ModalInstanceController',
                size: 'sm',
                resolve: {
                    title: function() { return "New Retrospective"; },
                    body: function() { return "As the Scrum Master you will control the phases of the retrospective on all participants\' devices. You may invite participants by sharing the invitation link or creating an e-mail. You must save the Admin access link to your computer, in case you get disconnected from this session, otherwise you won't be able to access this retrospective as an admin again. To delete your data off our servers, you must close the retrospective at the end."; },
                    hasCancel: function() { return false; }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $location.path('retro');
            });
        }, function(validation){
            if(typeof validation !== "object"){
                validation = [validation];
            }
            $scope.validation = validation;
        });
    };
}]);

module.exports = app;