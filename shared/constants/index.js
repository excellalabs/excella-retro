/* jslint node: true */
'use strict';

var readonly = require('./readonly.js');

var values = {
    authError: 'authentication error',
    board: require('./boardConstants')
};

exports = module.exports = readonly(values);
