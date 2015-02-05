/* global describe, it, before, beforeEach, after, afterEach, xdescribe, xit */
/* jslint node: true */
"use strict";
//var casper = require('../../../node_modules/casperjs/bin/casperjs').create();

var chai = require('chai'),
    spies = require('chai-spies'), casper_chai = require('casper-chai');
chai.use(casper_chai);
chai.use(spies);

var expect = chai.expect;
var assert = chai.assert;

var constants = require('../../../../shared/constants/boardConstants');
var helpers = require('../../../../shared/helpers.js');

describe('board', function () {

    describe('#Casper Test', function () {
        before(function() {
            casper.start('http://www.google.com/');
        });

        it('should retrieve 10 or more results', function() {
            casper.then(function() {
            'Google'.should.matchTitle;
            'form[action="/search"]'.should.be.inDOM.and.be.visible;
            this.fill('form[action="/search"]', {
                q: 'casperjs'
            }, true);
            });

            casper.waitForUrl(/q=casperjs/, function() {
                (/casperjs/).should.matchTitle;
             //   'a[value="CasperJS, a navigation scripting and testing utility for ..."'.should.
            });
        });

    });


});