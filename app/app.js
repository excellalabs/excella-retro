/* global require, module, exports */
/* jslint browser: true */
require('angular');
require('angular-route');
require('angular-bootstrap');
require('angular-xeditable');
require('./controllers/_module_init');
require('./directives/_module_init');
require('./services/boardService');
require('./services/adminService');
require('./services/userProvider');
require('./services/socketFactory');
require('./services/helpersModule');
require('./scratch/templates.js');

angular.module('app', [
    'remoteRetro.helpers',
    'remoteRetro.controllers',
    'remoteRetro.directives',
    'remoteRetro.userProvider',
    'remoteRetro.boardService',
    'remoteRetro.adminService',
    'remoteRetro.socketFactory',
    'ngRoute',
    'xeditable',
    'ui.bootstrap',
    'templates'
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .when('/retro/:id/join', {
            templateUrl: 'templates/join.html',
            controller: 'JoinController'
        })
        .when('/retro/:id/:scrumMasterKey', {
            templateUrl: 'templates/joinAsScrumMaster.html',
            controller: 'ScrumMasterController'
        })
        .when('/retro/:id', {
            templateUrl: 'templates/retroWizard.html',
            controller: 'BoardController'
        })
        .when('/tos', {
            templateUrl: 'templates/tos.html'
        })
        .when('/closed', {
            templateUrl: 'templates/close.html',
            controller: 'CloseViewModel'
        })
        .otherwise(
        {
            redirectTo: '/'
        });
}]).controller('AppController', [AppController]);

function AppController() {

}