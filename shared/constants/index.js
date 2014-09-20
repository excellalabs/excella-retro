/* jslint node: true */
'use strict';

var readonly = require('./readonly.js');

exports = module.exports = {
    authError: 'authentication error',
    board: require('./board')
};

readonly(exports);
