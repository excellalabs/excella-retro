/* jslint node: true */
'use strict';

function deepFreeze(o) {
    var prop, propKey;
    Object.freeze(o); // First freeze the object.

    for (propKey in o) {
        prop = o[propKey];
        if (!o.hasOwnProperty(propKey) || typeof prop !== 'object' || Object.isFrozen(prop)) {
            // If the object is on the prototype, not an object, or is already frozen,
            // skip it. Note that this might leave an unfrozen reference somewhere in the
            // object if there is an already frozen object containing an unfrozen object.
            continue;
        }

        deepFreeze(prop); // Recursively call deepFreeze.
    }
}
// make fields readonly
function readonly(obj){
    return deepFreeze(obj);
}

exports = module.exports = readonly;