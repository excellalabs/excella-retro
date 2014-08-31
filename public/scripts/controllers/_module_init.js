require('../services/boardService');
require('../services/userProvider');

module.exports = angular.module('remoteRetro.controllers', ['remoteRetro.boardService', 'remoteRetro.userProvider']);

// Define the list of controllers:
require('./homeViewModel.js');
require('./boardViewModel.js');
require('./joinViewModel.js');
