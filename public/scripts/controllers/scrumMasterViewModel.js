/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');

app.controller('ScrumMasterController', ['$scope', '$location', '$rootScope', '$routeParams',
    function($scope, $location, $rootScope, $routeParams) {
        "use strict";
        $rootScope.boardId = $routeParams.id;
        $rootScope.scrumMasterKey = $routeParams.scrumMasterKey;
        $location.path('board');
}]);

module.exports = app;