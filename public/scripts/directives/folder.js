/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.directive('folder', [function() {
    "use strict";

    return {
        restrict: 'E',
        templateUrl: 'templates/directives/folder.html',
        scope: {
            list: '='
        },
        controller: ['$scope', '$element', function($scope, $element){
            var folderController = this;
            var folderHolderController = $element.controller('folderHolder');

            $scope.enterFunction = function(event, options){
                if(folderController === options.draggable.element.controller('folder')) { return; }
                window.console.log('entered', event, options);
                options.dropArea.element.addClass('folder-drag-hover');
            };

            $scope.leaveFunction = function(event, options){
                if(folderController === options.draggable.element.controller('folder')) { return; }
                window.console.log('exited', event, options);
                options.dropArea.element.removeClass('folder-drag-hover');
            };

            $scope.dropFunction = function(event, options){
                if(folderController === options.draggable.element.controller('folder')) { return; }
                window.console.log('dropped', event, options);
                options.dropArea.element.removeClass('folder-drag-hover');

                var otherFolder = options.draggable.element.controller('folder');
                if(!otherFolder){ return; }

                var value = options.draggable.element.attr('data-value');
                if(value === '' || value === undefined || value === null) { return; }

                $scope.list.push(value);
                otherFolder.remove(value);
            };

            this.remove = function(value){
                var index = $scope.list.indexOf(value);
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
