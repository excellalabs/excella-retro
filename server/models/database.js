var level = require('level');

var fileDirectory = process.env.CLOUD_DIR || './remoteRetroDb';

var db = level(fileDirectory, { valueEncoding: 'json'});

module.exports = db;
