/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');


app.directive('dropArea', [function() {
    "use strict";
    return {
        require: '^dragContainer',
        restrict: 'C',
        scope: {
            onDrop: '=',
            onDragEnter: '=',
            onDragLeave: '='
        },
        controller: ['$scope', '$element', function($scope, $element){
            this.drop = function(event, draggable){
                if(typeof $scope.onDrop === "function"){
                    var options = {
                        draggable: draggable,
                        dropArea: { element: $element, scope: $scope }
                    };
                    $scope.onDrop(event, options);
                    return true;
                }
                return false;
            };

            this.dragEnter = function(event, draggable){
                if(typeof $scope.onDragEnter === "function"){
                    var options = {
                        draggable: draggable,
                        dropArea: { element: $element, scope: $scope }
                    };
                    $scope.onDragEnter(event, options);
                    return true;
                }
                return false;
            };

            this.dragLeave = function(event, draggable){
                if(typeof $scope.onDragLeave === "function"){
                    var options = {
                        draggable: draggable,
                        dropArea: { element: $element, scope: $scope }
                    };
                    $scope.onDragLeave(event, options);
                    return true;
                }
                return false;
            };
        }],
        link: function(scope, element, attrs, dragContainerCtrl){
            dragContainerCtrl.registerDropArea(element, scope);
        }
    };
}]);

module.exports = app;
