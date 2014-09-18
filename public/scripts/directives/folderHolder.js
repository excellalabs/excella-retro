/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('folderHolder', [function() {
    "use strict";

    return {
        restrict: 'E',
        template: '<div class="dragContainer"><folder ng-repeat="list in lists" list="list"></folder></div>',
        scope: {
            lists: '=',
            onChange: '='
        },
        controller: ['$scope', '$element', function($scope, $element){
            for(var i=0; i<$scope.lists.length; i++){
                if(!($scope.lists[i] instanceof Array)){
                    $scope.lists[i] = [$scope.lists[i]];
                }
            }

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
