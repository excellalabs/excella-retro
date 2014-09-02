/* jslint node: true */
var level = require('level');

var db = level('./remoteRetroDb', { valueEncoding: 'json'});

module.exports = db;
