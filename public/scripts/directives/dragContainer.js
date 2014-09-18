/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');
var interact = require('../../bower_components/interact/interact');


app.directive('dragContainer', [function() {
    "use strict";
    return {
        restrict: 'C',
        controller: ['$scope', '$element', '_', function($scope, $element, _){
            $scope.draggableList = [];
            this.registerDraggable = function(element, scope){
                $scope.draggableList.push({ element: element, controller: element.controller('draggable') });
            };

            $scope.dropAreaList = [];
            this.registerDropArea = function(element, scope){
                $scope.dropAreaList.push({ element: element, controller: element.controller('dropArea') });
            };

            this.getDropAreaContaining = function(x, y){
                var dropArea = _.find($scope.dropAreaList, function(dropArea){
                    return _.find(dropArea.element, function(el){
                        var elementRect = el.getBoundingClientRect();
                        return elementRect.top <= y && y < elementRect.bottom && elementRect.left <= x && x < elementRect.right;
                    });
                });
                if(dropArea) { return dropArea; }

                var folderHolderController = $element.controller('folderHolder');
                if(folderHolderController) { return { element: $element, controller: folderHolderController }; }
                return undefined;
            };
        }]
    };
}]);

module.exports = app;
