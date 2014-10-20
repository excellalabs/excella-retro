/* global require, module, exports */
/* jslint browser: true */

var angular = require('angular');
require('../services/boardService');
require('../services/userProvider');

module.exports = angular.module('remoteRetro.controllers', ['remoteRetro.boardService', 'remoteRetro.userProvider']);

// Define the list of controllers:
require('./homeViewModel.js');
require('./boardViewModel.js');
require('./joinViewModel.js');
require('./scrumMasterViewModel.js');
require('./retroWizardViewModel.js');
require('./modalInstanceController.js');

