/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('folder', [function() {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'templates/directives/folder.html',
        scope: {
            list: '=',
            ignoreColor: '&',
            ignoreAnimation: '&'
        },
        controller: ['$scope', '$element', function($scope, $element){
            $scope.ignoreColor = $scope.ignoreColor() || false;
            $scope.ignoreAnimation = $scope.ignoreAnimation() || false;
            $scope.colorAnimationClass = $scope.ignoreColor ? '' : 'animated-add-color';

            var folderController = this;
            var folderHolderController = $element.controller('folderHolder');

            $scope.enterFunction = function(event, options){
                if(folderController === options.draggable.element.controller('folder')) { return; }
                window.console.log('entered', event, options);

                if(!$scope.ignoreAnimation) {
                    options.dropArea.element.addClass('folder-drag-hover');
                }

                if(!$scope.ignoreColor) {
                    options.draggable.element.addClass('list-group-item-info');
                }
            };

            $scope.leaveFunction = function(event, options){
                if(folderController === options.draggable.element.controller('folder')) { return; }
                window.console.log('exited', event, options);

                if(!$scope.ignoreAnimation) {
                    options.dropArea.element.removeClass('folder-drag-hover');
                }

                if(!$scope.ignoreColor) {
                    options.draggable.element.removeClass('list-group-item-info');
                }
            };

            $scope.dropFunction = function(event, options){
                if(folderController === options.draggable.element.controller('folder')) { return; }
                window.console.log('dropped', event, options);

                if(!$scope.ignoreAnimation) {
                    options.dropArea.element.removeClass('folder-drag-hover');
                }

                if(!$scope.ignoreColor) {
                    options.draggable.element.removeClass('list-group-item-info');
                }

                var otherFolder = options.draggable.element.controller('folder');
                if(!otherFolder){ return; }

                var value = options.draggable.element.attr('data-value');
                if(value === '' || value === undefined || value === null) { return; }

                var index = options.draggable.element.attr('data-index');
                if(index === '' || index === undefined || index === null) { return; }

                $scope.list.push(value);
                otherFolder.removeAt(index);
            };

            this.remove = function(value){
                return this.removeAt($scope.list.indexOf(value));
            };

            this.removeAt = function(index){
                if(index >= 0){
                    $scope.list.splice(index, 1);
                }
                if(folderHolderController){
                    folderHolderController.changed();
                }

                if($scope.list.length === 0) {
                    if (folderHolderController) {
                        folderHolderController.removeFolder($scope.list);
                    } else {
                        $element.remove();
                    }
                }

                return index;
            };
        }]
    };
}]);

module.exports = app;
