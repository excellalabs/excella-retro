/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('folderHolder', [function() {
    "use strict";

    return {
        restrict: 'E',
        template: '<div class="dragContainer"><folder ignore-color="ignoreColor" ignore-animation="ignoreAnimation" ignore-drag="readonly" ng-repeat="item in lists" name="item.name" list="item"></folder></div>',
        scope: {
            lists: '=lists',
            onChange: '=onChange',
            ignoreColor: '&ignoreColor',
            ignoreAnimation: '&ignoreAnimation',
            readonly: '=readonly'
        },
        controller: ['$scope', '$element', function($scope, $element){
            $scope.ignoreColor = $scope.ignoreColor() || false;
            $scope.ignoreAnimation = $scope.ignoreAnimation() || false;

            var splice = [].splice;
            var push = [].push;
            for(var i=0; i<$scope.lists.length; i++){
                var list = $scope.lists[i];
                var newList = {};
                var index = 0;
                for(var name in list){
                    if(list.hasOwnProperty(name)){
                        newList[index] = list[name];
                        index++;
                    }
                }
                Object.defineProperty(newList, 'length', { value: index, writable: true });
                newList.splice = splice;
                newList.push = push;
                $scope.lists[i] = newList;
            }

            this.dragLeave = function(event, draggable){
                if(!$scope.ignoreColor) {
                    draggable.element.removeClass('list-group-item-success');
                }
            };

            this.dragEnter = function(event, draggable){
                if(!$scope.ignoreColor) {
                    draggable.element.addClass('list-group-item-success');
                }
            };

            this.drop = function(event, draggable){
                if(!$scope.ignoreColor) {
                    draggable.element.removeClass('list-group-item-success');
                }
                var folderController = draggable.element.controller('folder');
                var value = draggable.element.attr('data-value');
                var index = draggable.element.attr('data-index');
                folderController.removeAt(index);
                this.addFolder(value);
            };

            this.removeFolder = function(value){
                var index = $scope.lists.indexOf(value);
                if(index >= 0){
                    $scope.lists.splice(index, 1);
                }

                return index;
            };

            this.addFolder = function(value){
                if(!(value instanceof Array)){
                    value = [value];
                }

                $scope.lists.push(value);
            };

            this.changed = function(){
                if(typeof $scope.onChange === 'function'){
                    $scope.onChange();
                }
            };
        }]
    };
}]);

module.exports = app;
