/* global describe, it, before, beforeEach, after, afterEach, xdescribe, xit */
/* jslint node: true */
"use strict";

var chai = require('chai'),
    spies = require('chai-spies');
chai.use(spies);

var expect = chai.expect;

var boardModel = require('../../../server/models/board');

var boardController = require('../../../server/controllers/boardController');

describe('boardController', function(){
    describe('getBoard', function(){
        var oldGet = boardModel.get;
        var spyGet = chai.spy(function(id, cb){
            cb(spyErr, spyValue);
        });

        var spyErr, spyValue;

        // Setup: isolate method being tested from its dependencies
        before(function(){
            boardModel.get = spyGet;
        });

        // Teardown: return dependencies to their original state
        after(function(){
            boardModel.get = oldGet;
        });

        beforeEach(function(){
            spyErr = spyValue = undefined;
        });

        it('should call board.get exactly once', function(done){
            var request = {
                params: {
                    id: 0
                }
            };

            var reply = function(responseValue){
                expect(spyGet).to.have.been.called.exactly(1);
                done();
            };

            boardController.getBoard.handler(request, reply);
        });

        it('should reply with a 404 error if one is returned from board.get', function(done){
            spyErr = 'generic error';

            var request = {
                params: {
                    id: 0
                }
            };

            var reply = function(responseValue){
                expect(responseValue).to.be.an.instanceof(Error);
                expect(responseValue).to.have.deep.property('output.statusCode', 404);
                done();
            };

            boardController.getBoard.handler(request, reply);
        });

        it('should reply with the value returned from board.get if there is no error', function(done){
            spyValue = 'this is my response'

            var request = {
                params: {
                    id: 0
                }
            };

            var reply = function(responseValue){
                expect(responseValue).to.equal(spyValue);
                done();
            };

            boardController.getBoard.handler(request, reply);
        });
    });
});
