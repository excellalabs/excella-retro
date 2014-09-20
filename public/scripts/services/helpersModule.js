/* global require, module, exports */
/* jslint browser: true */

var helpers = require('../../../shared/helpers');
var _ = require('../../bower_components/lodash/dist/lodash');

var user = '', scrumMasterKey = null;

var app = angular.module('remoteRetro.helpers', [])
    .value('_', _)
    .value('helpers', helpers);

module.exports = app;