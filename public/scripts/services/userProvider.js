/* global require, module, exports */
/* jslint browser: true */

var angular = require('angular');
var helpers = require('../../../shared/helpers');

var user = '', scrumMasterKey = null;

var app = angular.module('remoteRetro.userProvider', [])
    .factory('userProvider', [function(){
        "use strict";
        return {
            setUser: function(newUser, isScrumMaster, validation){
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

                app.value('user', user);

                if(isScrumMaster) {
                    scrumMasterKey = helpers.guid();
                    app.value('scrumMasterKey', scrumMasterKey);
                } else {
                    scrumMasterKey = '';
                }

                return scrumMasterKey;
            },
            getUser: function(){
                return user;
            },
            setScrumMasterKey: function(newKey){
                scrumMasterKey = newKey;
            },
            isUserScrumMaster: function(routeKey, boardsScrumMasterKey){
                if(scrumMasterKey === null || scrumMasterKey === undefined) {
                    scrumMasterKey = boardsScrumMasterKey;
                    app.value('scrumMasterKey', scrumMasterKey);
                }
                return scrumMasterKey === routeKey;
            }
        };
    }])
    .value('user', user)
    .factory('scrumMasterKey', function(){
        "use strict";
        return scrumMasterKey;
    });

module.exports = app;