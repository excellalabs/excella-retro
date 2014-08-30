
require('../boardService');
require('../userProvider');

module.exports = angular.module('remoteRetro.controllers', ['remoteRetro.boardService', 'remoteRetro.userProvider']);

// Define the list of controllers:
require('./home.js');
require('./board.js');
