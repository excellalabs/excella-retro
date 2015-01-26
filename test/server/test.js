/* jslint node: true */
"use strict";

var query = require('./queryServer.js');
var controller = require('./controllers');

beforeEach(function (done) {
    var hapi = require('hapi');
    this.server = hapi.createServer(process.env.HOST || 'localhost', parseInt(process.env.PORT, 10) || 3000);
    done();
});


it('should create a board', function (done) {
    var request = { url: '/board/', method: 'GET' };
    test.request(this.server, request, function (res) {
        res.statusCode.should.be.equal(200);
        res.body.length.should.be.equal(6);
        done();
    });
});