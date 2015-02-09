// Use webdriverjs to create a Selenium Client
/* jslint node: true */
"use strict";

var client = require('./client').client;
var chai = require('chai'),
    spies = require('chai-spies');
chai.use(spies);

var expect = chai.expect;
var assert = chai.assert;

var constants = require('../../shared/constants/boardConstants');
var helpers = require('../../shared/helpers.js');

describe('Board Integration Tests', function(){
    before(function(done) {
        this.timeout(10000);
        client.init().url('http://localhost:3000', done);
    });

    describe('Login', function(){
        it('should see the correct title', function(done) {
            client.getTitle(function(err, title){
                expect(title).to.have.string('Excella Retro :)');
                done();
            });
        });
    });

    after(function(done) {
        client.end();
        done();
    });
});