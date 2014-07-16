require('../../bower_components/angular/angular');
require('../../bower_components/angular-route/angular-route');
require('../controllers/_module_init');

angular.element(document).ready(function() {

	var requires = [
		'boilerplate.controllers',
		'ngRoute'
	];

	var app = angular.module('boilerplate', requires);

	app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/templates/home.html', 
                controller: 'WelcomeCtrl'
            })
            .otherwise( 
                {
                    redirectTo: '/'
                });
            }]);

	angular.bootstrap(document, ['boilerplate']);

});
