/* global require, angular, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');
require('../../bower_components/angular/angular');
var interact = require('../../bower_components/interact/interact');


app.directive('draggable', [function() {
    "use strict";
    var dragOptions = {
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
            event.target.style.transition = 'transform 0.3s ease';
            event.target.style.webkitTransform =
                event.target.style.transform = '';
            event.target.setAttribute('data-x', 0);
            event.target.setAttribute('data-y', 0);
        }
    };

    return {
        restrict: 'C',
        link: function(scope, element){
            for(var i=0; i<element.length; i++){
                interact(element[i]).draggable(dragOptions);
            }
        }
    };
}]);

module.exports = app;
