var util = require('util');

function lengthValidator (minLength, maxLength) {

    return function(value) {
        var passes = !!(value && value.length);
        if (passes && minLength > 0) {
            passes &= value.length >= minLength;
        }

        if (passes && maxLength > 0) {
            passes &= value.length <= maxLength;
        }

        return passes;
    };
}

function buildLengthValidator (fieldName, minLength, maxLength) {
    var message = '';
    if (maxLength > 0) {
        if (minLength > 0) {
            message = util.format('%s must have a length between %d and %d', fieldName, minLength, maxLength);
        } else {
            message = util.format('%s must have a length no greater than %d', fieldName, maxLength);
        }
    } else {
        message = util.format('%s must have a length of at least %d', fieldName, minLength);
    }
    return [lengthValidator(minLength, maxLength), message];
}

function merge(model, fields){
    for(var name in fields){
        if(fields.hasOwnProperty(name)){
            model[name] = fields[name];
        }
    }
    return model;
}


module.exports = {
    buildLengthValidator: buildLengthValidator,
    lengthValidator: lengthValidator,
    merge: merge
};