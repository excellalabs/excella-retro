/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');
var interact = require('../../bower_components/interact/interact');


app.directive('draggable', ['$rootScope', function($rootScope) {
    "use strict";

    return {
        require: '^dragContainer',
        restrict: 'C',
        link: function(scope, element, attrs, dragContainerCtrl){
            var htmlElement = element[0];
            var targetDropArea = null;
            var eventOptions = { element: element, scope: scope };
            interact(htmlElement).draggable({
                onmove: function (event) {
                    $rootScope.$apply(function(){
                        var target = event.target,
                            x = (parseInt(target.getAttribute('data-x')) || 0) + event.dx,
                            y = (parseInt(target.getAttribute('data-y')) || 0) + event.dy,
                            xpos = event.clientX,
                            ypos = event.clientY;
                        var newDropArea = dragContainerCtrl.getDropAreaContaining(xpos, ypos);
                        if(newDropArea !== targetDropArea){
                            if(targetDropArea) { targetDropArea.controller.dragLeave(event, eventOptions); }
                            if(newDropArea) { newDropArea.controller.dragEnter(event, eventOptions); }
                            targetDropArea = newDropArea;
                        }
                        target.style.transition = '';
                        target.style.zIndex = 1000;
                        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    });
                },
                onend: function (event) {
                    $rootScope.$apply(function(){
                        event.target.style.zIndex = 0;
                        event.target.style.transition = 'transform 0.3s cubic-bezier(.33,1,.66,1), ' +
                            'z-index 0.3s cubic-bezier(.33,1,.66,1)';
                        event.target.style.webkitTransform = event.target.style.transform = '';
                        event.target.setAttribute('data-x', 0);
                        event.target.setAttribute('data-y', 0);
                        var folderController = element.controller('folder');
                        var folderHolderController = element.controller('folderHolder');
                        if(targetDropArea){
                            targetDropArea.controller.drop(event, eventOptions);
                        } else if(folderController && folderHolderController) {
                            var value = element.attr('data-value');
                            if(value !== '' && value !== undefined && value !== null) {
                                folderController.remove(value);
                                folderHolderController.addFolder(value);
                            }
                        }
                    });
                }
            });
        }
    };
}]);

module.exports = app;
