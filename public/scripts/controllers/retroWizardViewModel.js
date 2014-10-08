/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('RetroWizardViewModel', ['$scope', '$q', '$timeout',
    function ($scope, $q, $timeout) {
        'use strict';
        $scope.user = {};

        $scope.saveState = function() {
            var deferred = $q.defer();

            $timeout(function() {
                deferred.resolve();
            }, 5000);

            return deferred.promise;
        };

        $scope.completeWizard = function() {
            alert('Completed!');
        };
    }]);

module.exports = app;