
require('../boardRetriever');
require('../userProvider');

module.exports = angular.module('remoteRetro.controllers', ['remoteRetro.boardRetriever', 'remoteRetro.userProvider']);

// Define the list of controllers:
require('./home.js');
require('./board.js');
