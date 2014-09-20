/* global require, module, exports */
/* jslint browser: true */

var angular = require('angular');
var helpers = require('../../../shared/helpers');
var _ = require('lodash');

var user = '', scrumMasterKey = null;

var app = angular.module('remoteRetro.helpers', [])
    .value('_', _)
    .value('helpers', helpers);

module.exports = app;