var WelcomeCtrl = function($scope) {
	console.log('welcome controller');
	$scope.greetings = 'Hey!'
	$scope.whatsup = "This app is dope";
};

var module = require('./_module_init.js');
module.controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);