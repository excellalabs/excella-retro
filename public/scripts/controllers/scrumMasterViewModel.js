/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('ScrumMasterController', ['$scope', '$location', '$rootScope', '$routeParams',
    function($scope, $location, $rootScope, $routeParams) {
        "use strict";
        $rootScope.boardId = $routeParams.id;
        $rootScope.scrumMasterKey = $routeParams.scrumMasterKey;
        $location.path('retro');
}]);

module.exports = app;