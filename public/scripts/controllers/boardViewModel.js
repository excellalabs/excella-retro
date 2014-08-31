var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.controller('BoardController', ['$scope', '$routeParams', 'userProvider', 'boardService', function($scope, $routeParams, userProvider, boardService) {

    $scope.user = userProvider.getUser();

    boardService.getBoard($routeParams.id).then(function(board){
        $scope.board = board;
        setIsUserScrumMaster(board.scrumMasterKey);
        $scope.participantMailToLink = function(){
            return 'mailto:?subject=Join Retrospective: ' + $scope.board.title + '&body=' + escape('Please join my retrospective at:\n\n' + boardService.getJoinBoardUrl(board.id));
        }
        $scope.scrumMasterAccessLink = function(){
            return boardService.getScrumMasterAccessUrl(board.id, board.scrumMasterKey);
        }
        $scope.boardPhaseDisplayName = function(){
            switch(board.phase){
                case 'initial':
                    return 'Getting ready';
                case 'feedback-completed':
                    return 'Creating themes';
                default:
                    return '.';
            }
        }
    });

    function setIsUserScrumMaster(boardsScrumMasterKey){
        if($routeParams.scrumMasterKey) {
            $scope.isScrumMaster = userProvider.isUserScrumMaster($routeParams.scrumMasterKey, boardsScrumMasterKey);
        } else {
            $scope.isScrumMaster = false;
        }

        //window.history.replaceState({}, '', '#/board'); //allows only scrum master to share the url, use history.js for IE9 compat
    }

//    var currentParticipants = [];
//
//    boardService.getBoardParticipants($routeParams.id).then(function(participants){
//        currentParticipants.push(participants);
//        $scope.participants = participants;
//    });


}]);

module.exports = app;