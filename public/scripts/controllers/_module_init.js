
require('../boardRetriever');
require('../userProvider');

module.exports = angular.module('remoteRetro.controllers', ['remoteRetro.boardRetriever', 'remoteRetro.userProvider']);

// Just define the list of controllers here while developing the whole app (in this boilerplate, just one):
require('./home.js');
require('./board.js');
