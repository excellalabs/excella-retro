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

//Test Global Variables
var boardId;
var boardName = 'Board';
var scrumMaster = 'scrumMaster';
var scrumMasterKey = 'scrumMasterKey';
var userA = 'userA';
var userB = 'userB';

describe('boardController', function () {
    describe('#getBoard', function () {
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

    describe('#Test Board', function () {
        it('creation', function (done) {
            var request = {
                payload: {
                    user: scrumMaster,
                    boardName: boardName,
                    scrumMasterKey: scrumMasterKey
                }
            };

            var reply = function (responseValue) {
                expect(responseValue).to.have.deep.property('title', boardName);
                expect(responseValue).to.have.deep.property('scrumMaster', scrumMaster);
                expect(responseValue).to.have.deep.property('scrumMasterKey', scrumMasterKey);
                boardId = responseValue.id;
                done();
            };

            boardController.createBoard.handler(request, reply);
        });

        it('retrieval of previously createdBoard', function (done) {
            var request = {
                params: {
                    id: boardId
                }
            };

            var reply = function (responseValue) {
                expect(responseValue).to.have.deep.property('title', boardName);
                expect(responseValue).to.have.deep.property('scrumMaster', scrumMaster);
                expect(responseValue).to.have.deep.property('scrumMasterKey', scrumMasterKey);
                done();
            };

            boardController.getBoard.handler(request, reply);
        });

        it('scrum master key', function (done) {
           boardModel.isScrumMasterKeyCorrect(boardId, scrumMasterKey, function(err, result){
               assert.isNull(err, 'there was no error');
               assert.isTrue(result, 'Scrum Master Key was set correctly!');
               done();
           });
        });

        it('deletion', function (done) {
            var request = {
                params: {
                    id: boardId,
                    scrumMasterKey: scrumMasterKey,
                    test: true
                }
            };

            var reply = function (responseValue) {
                assert.isTrue(responseValue, 'Board has been deleted successfully');
                done();
            };

            boardController.deleteBoard.handler(request, reply);
        });

        it('no longer exists', function (done) {
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

    describe('#Board Participants', function () {
        before(function (done) {
            boardModel.create(scrumMaster, boardName, scrumMasterKey, function(err, data){
                assert.isUndefined(err, 'there was no error');
                boardId = data.id;

                boardModel.joinBoard(boardId, userA, function(err, data){
                    assert.isUndefined(err, 'there was no error');
                    boardModel.joinBoard(boardId, userB, function(err, data){
                        assert.isUndefined(err, 'there was no error');
                        done();
                    });
                });
            });
        });

        it('should find 2 particpants', function (done) {
            var request = {
                params: {
                    id: boardId
                }
            };

            var reply = function (responseValue) {
                expect(responseValue).to.include.members([userA, userB]);
                done();
            };

            boardController.getBoardParticipants.handler(request, reply);
        });

        it('should find 1 participant after 1 leaves', function (done) {
            boardModel.leaveBoard(boardId, userA, function(err, data) {
                assert.isUndefined(err, 'there was no error');
                var request = {
                    params: {
                        id: boardId
                    }
                };

                var reply = function (responseValue) {
                    expect(responseValue).to.include.members([userB]);
                    done();
                };

                boardController.getBoardParticipants.handler(request, reply);
            });
        });
    });

    describe('#Board Feedback', function () {
        before(function (done) {
            boardModel.create(scrumMaster, boardName, scrumMasterKey, function(err, data){
                assert.isUndefined(err, 'there was no error');
                boardId = data.id;

                boardModel.joinBoard(boardId, userA, function(err, data){
                    assert.isUndefined(err, 'there was no error');
                    boardModel.joinBoard(boardId, userB, function(err, data){
                        assert.isUndefined(err, 'there was no error');
                        done();
                    });
                });
            });
        });

        it('added to \'What Went Well\'', function (done) {
            var request = {
                params: {
                    id: boardId,
                    type: constants.feedbackTypes.whatWentWell
                },
                payload: {
                    feedback: 'testFeedback'
                }
            };

            var reply = function (responseValue) {
                assert.equal(responseValue, 'testFeedback');
                done();
            };

            boardController.addFeedback.handler(request, reply);
        });

        it('changed to \'Improve Feedback\'', function (done) {
            var request = {
                params: {
                    id: boardId,
                    type: constants.feedbackTypes.whatNeedsImprovement,
                    test: true
                },
                payload: {
                    feedback: 'testFeedback',
                    scrumMasterKey: scrumMasterKey
                }
            };

            var reply = function (responseValue) {
                expect(responseValue).to.have.deep.property('improveFeedback', 'testFeedback');
                done();
            };

            boardController.setFeedback.handler(request, reply);
        });

    });

});
