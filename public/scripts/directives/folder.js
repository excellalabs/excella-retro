/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('folder', [function() {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'templates/directives/folder.html',
        scope: {
            list: '=list',
            name: '=name',
            ignoreColor: '&ignoreColor',
            ignoreAnimation: '&ignoreAnimation',
            ignoreDrag: '=ignoreDrag'
        },
        controller: ['$scope', '$element', function($scope, $element){
            $scope.ignoreColor = $scope.ignoreColor() || false;
            $scope.ignoreAnimation = $scope.ignoreAnimation() || false;
            $scope.colorAnimationClass = $scope.ignoreColor ? '' : 'animated-add-color';
            $scope.nameIsSet = false;

            var folderController = this;
            var folderHolderController = $element.controller('folderHolder');

            if($scope.list.length > 1){
                $scope.nameIsSet = true;
                $scope.name = $scope.list[0];
            } else {
                $scope.name = '';
            }

            $scope.enterFunction = function(event, options){
                if(folderController === options.draggable.element.controller('folder')) { return; }
                window.console.log('entered', event, options);

                if(!$scope.nameIsSet){
                    $scope.name = 'New Theme';
                }

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
                if(!$scope.nameIsSet){
                    $scope.name = '';
                }

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

                if(!$scope.nameIsSet){
                    $scope.nameIsSet = true;
                    $scope.name = $scope.list[0];
                }

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
                } else if($scope.list.length === 1){
                    $scope.nameIsSet = false;
                    $scope.name = '';
                }

                return index;
            };
        }]
    };
}]);

app.directive('folderHeading', [function() {
    "use strict";

    return {
        restrict: 'E',
        require: '^folder',
        template: '<input type="text" ng-model="name" /><span class="glyphicon glyphicon-pencil form-control-feedback"></span>',
        scope: {
            name: '=',
            nameIsSet: '='
        },
        controller: ['$scope', '$element', function($scope, $element){
            $element.css('display', 'block');
            $element.on('click', function(){
                $element.find('input')[0].focus();
            });
        }]
    };
}]);

module.exports = app;
