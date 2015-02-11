/* jslint node: true */
'use strict';

// Load in our actual project
require('remoteRetro');

// Dependencies
require('angular-mocks');
var chai = require('chai');
chai.use('sinon-chai');

var sinon = require('sinon');

beforeEach(function() {
    // Create a new sandbox before each test
    this.sinon = sinon.sandbox.create();
});

afterEach(function() {
    // Cleanup the sandbox to remove all the stubs
    this.sinon.restore();
});

module.exports = {
    rootUrl: 'http://localhost:3000',
    expect: chai.expect
};