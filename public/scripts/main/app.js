/* global require, angular */
/* jslint browser: true */

require('../../bower_components/angular/angular');
require('../../bower_components/angular-route/angular-route');
require('../../bower_components/angular-bootstrap/ui-bootstrap');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls');
require('../controllers/_module_init');
require('../directives/_module_init');
require('../services/boardService');
require('../services/userProvider');
require('../services/socketFactory');
require('../services/helpersModule');

angular.element(document).ready(function() {
    "use strict";
	var requires = [
        'remoteRetro.helpers',
        'remoteRetro.controllers',
        'remoteRetro.directives',
        'remoteRetro.userProvider',
		'remoteRetro.boardService',
        'remoteRetro.socketFactory',
		'ngRoute',
        'ui.bootstrap'
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
            .when('/dragDropTest', {
                templateUrl: '/templates/dragDropTest.html'
            })
            .otherwise( 
                {
                    redirectTo: '/'
                });
            }]);

	angular.bootstrap(document, ['remoteRetro']);

});
