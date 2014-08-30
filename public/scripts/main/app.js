require('../../bower_components/angular/angular');
require('../../bower_components/angular-route/angular-route');
require('../controllers/_module_init');
require('../directives/_module_init');
require('../boardService');
require('../userProvider');


angular.element(document).ready(function() {

	var requires = [
        'remoteRetro.controllers',
        'remoteRetro.directives',
        'remoteRetro.userProvider',
		'remoteRetro.boardService',
		'ngRoute'
	];

	var app = angular.module('remoteRetro', requires);

	app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/templates/home.html', 
                controller: 'HomeController'
            })
            .when('/board/:id', {
                templateUrl: '/templates/boardContainer.html',
                controller: 'BoardController'
            })
            .otherwise( 
                {
                    redirectTo: '/'
                });
            }]);

	angular.bootstrap(document, ['remoteRetro']);

});
