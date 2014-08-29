require('../../bower_components/angular/angular');
require('../../bower_components/angular-route/angular-route');
require('../controllers/_module_init');
require('../boardRetriever');
require('../userProvider');
require('../directives');

angular.element(document).ready(function() {

	var requires = [
        'remoteRetro.controllers',
        'remoteRetro.userProvider',
		'remoteRetro.boardRetriever',
        'remoteRetro.directives',
		'ngRoute'
	];

	var app = angular.module('remoteRetro', requires);

	app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/templates/home.html', 
                controller: 'HomeController'
            })
            .otherwise( 
                {
                    redirectTo: '/'
                });
            }]);

	angular.bootstrap(document, ['remoteRetro']);

});
