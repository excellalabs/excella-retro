/* global describe, it, before, beforeEach, after, afterEach, xdescribe, xit */
/* jslint node: true */
"use strict";

var chai = require('chai'),
    spies = require('chai-spies');
chai.use(spies);

var expect = chai.expect;
var assert = chai.assert;

var constants = require('../../../shared/constants/boardConstants');

var boardModel = require('../../../server/models/board');
var boardController = require('../../../server/controllers/boardController');
var boardId;

//Socket Connection Info
var Hapi = require('hapi');
var io = require('socket.io-client');
var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};

exports.request = function (server, requestobj, callback) {
    server.inject(requestobj, function (res) {
        if (res.payload) {
            res.body = JSON.parse(res.payload);
        }
        callback(res);
    });
};

describe('boardController', function () {
    describe('getBoard', function () {
        var oldGet = boardModel.get;
        var spyGet = chai.spy(function (id, cb) {
            cb(spyErr, spyValue);
        });

        var spyErr, spyValue;

        // Setup: isolate method being tested from its dependencies
        before(function () {
            boardModel.get = spyGet;
        });

        // Teardown: return dependencies to their original state
        after(function () {
            boardModel.get = oldGet;
        });

        beforeEach(function () {
            spyErr = spyValue = undefined;
        });

        it('should call board.get exactly once', function (done) {
            var request = {
                params: {
                    id: 0
                }
            };

            var reply = function (responseValue) {
                expect(spyGet).to.have.been.called.exactly(1);
                done();
            };

            boardController.getBoard.handler(request, reply);
        });

        it('should reply with a 404 error if one is returned from board.get', function (done) {
            spyErr = 'generic error';

            var request = {
                params: {
                    id: 0
                }
            };

            var reply = function (responseValue) {
                expect(responseValue).to.be.an.instanceof(Error);
                expect(responseValue).to.have.deep.property('output.statusCode', 404);
                done();
            };

            boardController.getBoard.handler(request, reply);
        });

        it('should reply with the value returned from board.get if there is no error', function (done) {
            spyValue = 'this is my response';

            var request = {
                params: {
                    id: 0
                }
            };

            var reply = function (responseValue) {
                expect(responseValue).to.equal(spyValue);
                done();
            };

            boardController.getBoard.handler(request, reply);
        });
    });

    describe('createBoard', function () {
        it('should create a board', function (done) {
            var request = {
                //url: '/board',
                //method: 'POST'
                payload: {
                    user: 'john',
                    boardName: 'testBoard',
                    scrumMasterKey: 'testKey'
                }
            };

            var reply = function (responseValue) {
                expect(responseValue).to.have.deep.property('title', 'testBoard');
                expect(responseValue).to.have.deep.property('scrumMaster', 'john');
                expect(responseValue).to.have.deep.property('scrumMasterKey', 'testKey');
                boardId = responseValue.id;
                done();
            };

            boardController.createBoard.handler(request, reply);
        });

        it('should get the previously createdBoard', function (done) {
            var request = {
                params: {
                    id: boardId
                }
            };

            var reply = function (responseValue) {
                expect(responseValue).to.have.deep.property('title', 'testBoard');
                expect(responseValue).to.have.deep.property('scrumMaster', 'john');
                expect(responseValue).to.have.deep.property('scrumMasterKey', 'testKey');
                done();
            };

            boardController.getBoard.handler(request, reply);
        });


    });

    describe.skip('joinBoardAndLeaveFeedback', function () {

    });

    describe('deleteBoard', function () {
        it('should delete board', function (done) {
            var request = {
                params: {
                    id: boardId,
                    scrumMasterKey: 'testKey',
                    test: true
                }
            };

            var reply = function (responseValue) {
                assert.isTrue(responseValue, 'Board has been deleted successfully');
                done();
            };

            boardController.deleteBoard.handler(request, reply);
        });

        it('Board no longer exists', function (done) {
            var request = {
                params: {
                    id: boardId
                }
            };

            var reply = function (responseValue) {
                expect(responseValue).to.be.an.instanceof(Error);
                expect(responseValue).to.have.deep.property('output.statusCode', 404);
                done();
            };

            boardController.getBoard.handler(request, reply);
        });
    });

});
