/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('JoinController', ['$scope', 'userProvider', 'boardService', '$location', '$rootScope', '$routeParams', '$modal', function($scope, userProvider, boardService, $location, $rootScope, $routeParams, $modal) {
    "use strict";
    $scope.joinBoard = function(){
        var isScrumMaster = false;

        var validation = [];
        userProvider.setUser($scope.user, isScrumMaster, validation);
        $scope.validation = validation;

        if(validation.length){
            return;
        }

        boardService.joinBoard($routeParams.id, $scope.user).then(function(success){
            if(success) {
                $rootScope.boardId = $routeParams.id;
                var modalInstance = $modal.open({
                    templateUrl: 'templates/modal.html',
                    controller: 'ModalInstanceController',
                    size: 'sm',
                    resolve: {
                        title: function() { return "You've Joined a Retrospective"; },
                        body: function() { return "Your Scrum Master will control the phases of this retrospective on your device. If you get disconnected, you may re-join the board by clicking on the invitation link you've received. Once the retrospective is closed, you will not have access to the data."; },
                        hasCancel: function() { return false; }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $location.path('retro');
                });
            } else {
                $scope.validation = ['Can\'t join the retrospective.'];
            }
        }).catch(function() {
            $scope.validation = ['Can\'t join the retrospective.'];
        });
    };
}]);

module.exports = app;