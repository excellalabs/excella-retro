/* global require, angular, module, exports */
/* jslint browser: true */

var io = require('socket.io-client');

// socket.on('connect') only fires once when the connect event occurs, but socket.connectPromise will fire both:
// 1) asynchronously when the connect event occurs, and
// 2) synchronously for each callback registered thereafter.
// therefore, socket.connectPromise should be used at any time that the event may be registered after the connection occurs
// this paradigm, however, cannot be followed for the socket's message queue, due to the fact that multiple messages of the 'message' type can occur
// also of note: this factory method only gets called once (and lazily, at that), and the result cached in angular, so there will only be one socket at any given time

// the purpose of the wrappedSocket is to provide the same functionality as a socket.io emitter, but without the hassle of having to apply the scope
// it also adds some functionality, such as onConnect, which uses the connectPromise, and offOn, which first un-registers, then re-registers callbacks

var app = angular.module('remoteRetro.socketFactory', [])
    .factory('unwrappedSocket', ['$q', function($q){
        "use strict";
        var socket = io();
        var deferred = $q.defer();
        socket.connectPromise = deferred.promise;

        socket.on('connect', function(){
            deferred.resolve();
        });
        return socket;
    }])
    .factory('socket', ['$rootScope', 'unwrappedSocket', function($rootScope, socket){
        "use strict";
        var wrappedSocket = {};

        wrappedSocket.bare = socket;

        wrappedSocket.onConnect = function(callback){
            socket.connectPromise.then(function(){
                callback();
            });
            return this;
        };

        wrappedSocket.offOn = function(eventName, callback){
            socket.off(eventName);
            this.on(eventName, callback);
            return this;
        };

        wrappedSocket.on =
        wrappedSocket.addEventListener = function(eventName, callback){
            socket.on(eventName, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    if(typeof callback === "function") {
                        callback.apply(socket, args);
                    }
                });
            });
            return this;
        };

        wrappedSocket.once = function(eventName, callback){
            socket.once(eventName, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    if(typeof callback === "function") {
                        callback.apply(socket, args);
                    }
                });
            });
            return this;
        };

        wrappedSocket.off =
        wrappedSocket.removeListener =
        wrappedSocket.removeAllListeners =
        wrappedSocket.removeEventListener = function(eventName, callback){
            socket.off(eventName, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    if(typeof callback === "function") {
                        callback.apply(socket, args);
                    }
                });
            });
            return this;
        };

        wrappedSocket.emit = function(){
            socket.emit.apply(socket, arguments);
            return this;
        };

        wrappedSocket.listeners = function(){
            return socket.listeners.apply(socket, arguments);
        };

        wrappedSocket.hasListeners = function(){
            return socket.hasListeners.apply(socket, arguments);
        };

        return wrappedSocket;
    }]);

module.exports = app;