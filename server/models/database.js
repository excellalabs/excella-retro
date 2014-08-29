var level = require('level');

var db = level('./remoteRetroDb');

module.exports = db;
