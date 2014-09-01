var app = require('./_module_init.js');
require('../../bower_components/angular/angular');
var io = require('../../bower_components/socket.io-client')

app.controller('BoardController', ['$scope', '$routeParams', 'userProvider', 'boardService', '$location', '$rootScope', function($scope, $routeParams, userProvider, boardService, $location, $rootScope) {
    if(!$rootScope.boardId) {
        $location.path('#');
    }
    else {
        boardService.getBoard($rootScope.boardId).then(function (board) {
            $scope.board = board;
            setIsUserScrumMaster(board.scrumMaster, board.scrumMasterKey);
            $scope.participantMailToLink = function () {
                return 'mailto:?subject=Join Retrospective: ' + $scope.board.title + '&body=' + escape('Please join my retrospective at:\n\n' + boardService.getJoinBoardUrl(board.id));
            }
            $scope.scrumMasterAccessLink = function () {
                return boardService.getScrumMasterAccessUrl(board.id, board.scrumMasterKey);
            }
            $scope.boardPhaseDisplayName = function () {
                switch (board.phase) {
                    case 'initial':
                        return 'Getting ready';
                    case 'feedback-completed':
                        return 'Creating themes';
                    default:
                        return '.';
                }
            }
        });

        function setIsUserScrumMaster(scrumMaster, boardsScrumMasterKey) {
            var user = userProvider.getUser();

            if (!user || user == '') {
                user = scrumMaster;
            }

            $scope.user = user;

            if ($rootScope.scrumMasterKey) {
                $scope.isScrumMaster = userProvider.isUserScrumMaster($rootScope.scrumMasterKey, boardsScrumMasterKey);
            } else {
                $scope.isScrumMaster = false;
            }
        }

        boardService.getBoardParticipants($rootScope.boardId).then(function(participants){
            $scope.participants = participants;
        });

        var socket = io();

        socket.on('join', function(participants){
            $scope.participants = participants;
        });
    }
}]);

module.exports = app;