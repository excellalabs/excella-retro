/* jslint node: true */
var level = require('level');
var path = require('path');

var basePath = process.env.APP_DIR || ".";

var dbPath = process.env.DB_PATH || path.join(basePath, '/remoteRetroDb');

console.log('Database path: ' + dbPath);

var db = level(dbPath, { valueEncoding: 'json'});

module.exports = db;
