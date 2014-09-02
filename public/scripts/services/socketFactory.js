/* global require, angular, module, exports */
/* jslint browser: true */

require('../../bower_components/angular/angular');
var io = require('socket.io-client');

// socket.on('connect') only fires once when the connect event occurs, but socket.connectPromise will fire both:
// 1) asynchronously when the connect event occurs, and
// 2) synchronously for each callback registered thereafter.
// therefore, socket.connectPromise should be used at any time that the event may be registered after the connection occurs
// this paradigm, however, cannot be followed for the socket's message queue, due to the fact that multiple messages of the 'message' type can occur
// also of note: this factory method only gets called once (and lazily, at that), and the result cached in angular, so there will only be one socket at any given time

var app = angular.module('remoteRetro.socketFactory', [])
    .factory('socket', ['$q', function($q){
        "use strict";
        var socket = io();
        var deferred = $q.defer();
        socket.connectPromise = deferred.promise;

        socket.on('connect', function(){
            deferred.resolve();
        });
        return socket;
    }]);

module.exports = app;