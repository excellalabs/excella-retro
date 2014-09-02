/* jshint ignore:start */
require('../../bower_components/angular/angular');
require('../../bower_components/angular-route/angular-route');
require('../controllers/_module_init');
require('../directives/_module_init');
require('../services/boardService');
require('../services/userProvider');
/* jshint ignore:end */

window.console.log("HYUP!");

window.angular.element(document).ready(function() {
    "use strict";
	var requires = [
        'remoteRetro.controllers',
        'remoteRetro.directives',
        'remoteRetro.userProvider',
		'remoteRetro.boardService',
		'ngRoute'
	];

	var app = window.angular.module('remoteRetro', requires);

	app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/templates/home.html', 
                controller: 'HomeController'
            })
            .when('/board/:id/join', {
                templateUrl: '/templates/join.html',
                controller: 'JoinController'
            })
            .when('/board/:id/:scrumMasterKey', {
                templateUrl: '/templates/joinAsScrumMaster.html',
                controller: 'ScrumMasterController'
            })
            .when('/board', {
                templateUrl: '/templates/boardContainer.html',
                controller: 'BoardController'
            })
            .otherwise( 
                {
                    redirectTo: '/'
                });
            }]);

	window.angular.bootstrap(document, ['remoteRetro']);

});
