/* jslint node: true */
'use strict';

// make fields readonly
function readonly(obj){
    var getterMaker = function (propName, value){
        return function(){ return value; };
    };

    for(var propName in obj){
        if(obj.hasOwnProperty(propName)){
            var propValue = obj[propName];
            obj.__defineGetter__(propName, getterMaker(propName, propValue));
        }
    }
}

exports = module.exports = readonly;