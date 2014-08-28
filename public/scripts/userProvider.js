'use strict';

require('../bower_components/angular/angular');
var hash = require('../bower_components/hash/lib/hash');

var user = '', userHash = '';

var app = angular.module('remoteRetro.userProvider', [])
    .factory('userProvider', [function(){
        return {
            setUser: function(newUser, validation){
                if(!validation || typeof validation.push !== "function"){
                    validation = [];
                }

                if(typeof newUser !== "string"){
                    validation.push('Identifier must be a string.');
                } else if(newUser.length < 3){
                    validation.push('Identifier must be at least 3 characters long.');
                }

                if(validation.length){
                    return false;
                }

                user = newUser;
                userHash = hash(user);

                app.value('user', user);
                app.value('userHash', userHash);

                return userHash;
            },
            getUser: function(){
                return user;
            },
            getUserHash: function(){
                return userHash;
            }
        }
    }])
    .value('user', user)
    .value('userHash', userHash);

module.exports.app = app;