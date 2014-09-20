/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
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
                        element.css({
                            'transition': '',
                            'z-index': 1000,
                            'transform': 'translate(' + x + 'px, ' + y + 'px)'
                        });
                        element.attr('data-x', x);
                        element.attr('data-y', y);
                        element.addClass('transparent');
                    });
                },
                onend: function (event) {
                    $rootScope.$apply(function(){
                        element.css({
                            'z-index': 0,
                            'transform': ''
                        });
                        element.attr('data-x', 0);
                        element.attr('data-y', 0);
                        element.removeClass('transparent');
                        if(targetDropArea){
                            targetDropArea.controller.drop(event, eventOptions);
                        }
                        if(targetDropArea.controller === element.controller('dropArea')) {
                            element.css('transition','transform 0.3s cubic-bezier(.33,1,.66,1), ' +
                                'z-index 0.3s cubic-bezier(.33,1,.66,1)');
                        }
                    });
                }
            });
        }
    };
}]);

module.exports = app;
