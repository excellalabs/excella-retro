/* global require, module, exports */
/* jslint browser: true */

var angular = require('angular');
require('./helpersModule');

var app = angular.module('remoteRetro.adminService', ['remoteRetro.helpers']);
app.factory('adminService', ['$http', '$q', 'userProvider', 'socket', '_',
        function($http, $q, userProvider, socket, _){
            "use strict";

            return {
                sendFeedback: function (feedback) {
                    var deferred = $q.defer();
                    $http.post('../feedback', {feedback: feedback}).then(function (ctx) {
                        deferred.resolve(ctx.data);
                    }, function (ctx) {
                        deferred.reject(ctx.data);
                    });
                    return deferred.promise;
                }
            };
        }]);

module.exports = app;

