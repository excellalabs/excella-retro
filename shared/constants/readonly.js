/* jslint node: true */
'use strict';

// make fields readonly
function readonly(obj){
    var newObj = {};
    for(var propName in obj){
        if(obj.hasOwnProperty(propName)){
            var propValue = obj[propName];
            if(propValue instanceof Object){
                propValue = readonly(propValue);
            }
            Object.defineProperty(newObj, propName, { value: propValue, enumerable: true, writable: false });
        }
    }

    return newObj;
}

exports = module.exports = readonly;