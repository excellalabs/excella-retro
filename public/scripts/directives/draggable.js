/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');
var interact = require('../../bower_components/interact/interact');


app.directive('draggable', [function() {
    "use strict";

    return {
        require: '^dragContainer',
        restrict: 'C',
        controller: ['$scope', function($scope){

        }],
        link: function(scope, element, attrs, dragContainerCtrl){
            var htmlElement = element[0];
            interact(htmlElement).draggable({
                onmove: function (event) {
                    var target = event.target,
                        x = (parseInt(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseInt(target.getAttribute('data-y')) || 0) + event.dy;
                    event.target.style.transition = '';
                    target.style.webkitTransform =
                        target.style.transform =
                            'translate(' + x + 'px, ' + y + 'px)';
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                onend: function (event) {
                    var x = event.clientX, y = event.clientY;
                    var dropArea = dragContainerCtrl.getDropAreaContaining(x, y);
                    event.target.style.transition = 'transform 0.3s cubic-bezier(.33,1,.66,1)';
                    event.target.style.webkitTransform = event.target.style.transform = '';
                    event.target.setAttribute('data-x', 0);
                    event.target.setAttribute('data-y', 0);
                    if(dropArea){
                        dropArea.scope.drop({ element: element, scope: scope });
                    }
                }
            });
        }
    };
}]);

module.exports = app;
