/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');
var interact = require('../../bower_components/interact/interact');


app.directive('dropArea', [function() {
    "use strict";
    return {
        require: '^dragContainer',
        restrict: 'C',
        scope: {
            onDrop: '='
        },
        controller: ['$scope', function($scope){
        }],
        link: function(scope, element, attrs, dragContainerCtrl){
            scope.drop = function(event, draggable){
                if(typeof scope.onDrop === "function"){
                    var options = {
                        draggable: draggable,
                        dropArea: { element: element, scope: scope }
                    };
                    scope.onDrop(event, options);
                    return true;
                }
                return false;
            };
            dragContainerCtrl.registerDropArea(element, scope);
        }
    };
}]);

module.exports = app;
