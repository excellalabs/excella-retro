/* global describe, it, before, beforeEach, after, afterEach, xdescribe, xit */
/* jslint node: true */
"use strict";

define(['jquery', 'chai', 'chai-as-promised', 'sinon-chai', 'sinon', 'lodash', 'app', 'angular', 'angularMocks'],
    function ($, chai, asPromised, sinonChai, sinon, _, app, angular, angMock) {
        chai.use(sinonChai);
        chai.use(asPromised);
        var expect = chai.expect;
        var assert = chai.assert;

        describe("Retro Client Unit Tests", function () {
            var ctrl, scope, $httpBackend, boardService, userProvider;
            var boardUrl = '../board';

            // Load the module with Controller to be tested
            beforeEach(module('remoteRetro'));

            beforeEach(inject(function ($controller, $rootScope, _boardService_, _userProvider_, _$httpBackend_, $injector) {//, $injector, $q

                // Create a new scope that's a child of the $rootScope
                scope = $rootScope.$new();
                boardService = _boardService_;
                userProvider = _userProvider_;
                $httpBackend = _$httpBackend_;
            }));

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            describe("Board Unit Tests", function () {
                it('should have a board service with 15 working methods', function (done) {
                    expect(boardService).not.to.equal(null);
                    expect(boardService.createBoard).not.to.equal(null);
                    expect(boardService.getBoard).not.to.equal(null);
                    expect(boardService.getBoardParticipants).not.to.equal(null);
                    expect(boardService.joinBoard).not.to.equal(null);
                    expect(boardService.closeBoard).not.to.equal(null);
                    expect(boardService.sendFeedback).not.to.equal(null);
                    expect(boardService.editFeedback).not.to.equal(null);
                    expect(boardService.deleteFeedback).not.to.equal(null);
                    expect(boardService.changeThemes).not.to.equal(null);
                    expect(boardService.updateFeedback).not.to.equal(null);
                    expect(boardService.sendVotes).not.to.equal(null);
                    expect(boardService.putPhase).not.to.equal(null);
                    expect(boardService.getJoinBoardUrl).not.to.equal(null);
                    expect(boardService.getScrumMasterAccessUrl).not.to.equal(null);
                    expect(boardService.save).not.to.equal(null);
                    expect(Object.keys(boardService)).to.have.length(15);
                    done();
                });

                it('should expect \'Create Board\' service call to be resolved', inject(['$http', function ($http) {
                    $httpBackend.expectPOST(boardUrl, {
                        user: 'user', boardName: 'boardName', scrumMasterKey: 'scrumMasterKey'
                    }).respond({
                        id: 12345,
                        title: 'testboard',
                        phase: 'well',
                        scrumMaster: 'scrumMaster',
                        scrumMasterKey: 'scrumMasterKey',
                        participants: [],
                        wellFeedback: [],
                        improveFeedback: [],
                        actionItems: [],
                        themes: []
                    });

                    var promise = boardService.createBoard('user', 'boardName', 'scrumMasterKey');
                    promise.then(function (res) {
                        expect(res).to.have.deep.property('id', 12345);
                        expect(res).to.have.deep.property('title', 'testboard');
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Get Board\' service call to be resolved', inject(['$http', function ($http) {
                    $httpBackend.expectGET(boardUrl + '/12345').respond({
                        id: 12345,
                        title: 'testboard',
                        phase: 'well',
                        scrumMaster: 'scrumMaster',
                        scrumMasterKey: 'scrumMasterKey',
                        participants: [],
                        wellFeedback: [],
                        improveFeedback: [],
                        actionItems: [],
                        themes: []
                    });

                    var promise = boardService.getBoard(12345);
                    promise.then(function (res) {
                        expect(res).to.have.deep.property('id', 12345);
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Get Participants\' service call to be resolved', inject(['$http', function ($http) {
                    $httpBackend.expectGET(boardUrl + '/12345/participants').respond({
                        participants: ['user A']
                    });

                    var promise = boardService.getBoardParticipants(12345);
                    promise.then(function (res) {
                        expect(res.participants).to.include('user A');
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Close Board\' service call to be resolved', inject(['$http', function ($http) {
                    $httpBackend.expectDELETE(boardUrl + '/12345/scrumMasterKey').respond(true);

                    var promise = boardService.closeBoard(12345, 'scrumMasterKey');
                    promise.then(function (res) {
                        assert.isTrue(res);
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Send Feedback\' service call to be resolved', inject(['$http', function ($http) {
                    var fd = 'test feedback';

                    $httpBackend.expectPOST(boardUrl + '/12345/feedback/well', {
                        feedback: fd
                    }).respond({
                        feedback: fd
                    });

                    var promise = boardService.sendFeedback(12345, 'well', fd);
                    promise.then(function (res) {
                        expect(res).to.have.deep.property('feedback', fd);
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Edit Feedback\' service call to be resolved', inject(['$http', function ($http) {
                    var editedFd = {id: 12, feedback: 'edited Feedback'};

                    $httpBackend.expectPOST(boardUrl + '/12345/editFeedback/well', {
                        editedFeedback: editedFd
                    }).respond({
                        editedFeedback: editedFd
                    });

                    var promise = boardService.editFeedback(12345, 'well', editedFd);
                    promise.then(function (res) {
                        expect(res.editedFeedback.feedback).to.equal('edited Feedback');
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Delete Feedback\' service call to be resolved', inject(['$http', function ($http) {
                    $httpBackend.expectDELETE(boardUrl + '/12345/deleteFeedback/well/13').respond(true);

                    var promise = boardService.deleteFeedback(12345, 'well', 13);
                    promise.then(function (res) {
                        assert.isTrue(res);
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Change Themes\' service call to be resolved', inject(['$http', function ($http) {
                    var themes = ['theme1', 'theme2'];

                    $httpBackend.expectPOST(boardUrl + '/12345/themes', {
                        themes: themes
                    }).respond({
                        id: 12345,
                        title: 'testboard',
                        phase: 'well',
                        scrumMaster: 'scrumMaster',
                        scrumMasterKey: 'scrumMasterKey',
                        participants: [],
                        wellFeedback: [],
                        improveFeedback: [],
                        actionItems: [],
                        themes: ['theme1', 'theme2']
                    });

                    var promise = boardService.changeThemes(12345, themes);
                    promise.then(function (res) {
                        expect(res.themes).to.have.length([2]);
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Update Feedback\' service call to be resolved', inject(['$http', function ($http) {
                    $httpBackend.expectPUT(boardUrl + '/12345/setFeedback/well', {
                        feedback: ['fd1', 'fd2'],
                        scrumMasterKey: 'scrumMasterKey'
                    }).respond({
                        id: 12345,
                        title: 'testboard',
                        phase: 'well',
                        scrumMaster: 'scrumMaster',
                        scrumMasterKey: 'scrumMasterKey',
                        participants: [],
                        wellFeedback: [{id: 1, feedback: 'fd1'}, {id: 2, feedback: 'fd2'}],
                        improveFeedback: [],
                        actionItems: [],
                        themes: ['theme1', 'theme2']
                    });

                    var promise = boardService.updateFeedback(12345, 'well', ['fd1', 'fd2'], 'scrumMasterKey');
                    promise.then(function (res) {
                        expect(res.wellFeedback).to.have.length(2);
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Send Votes\' service call to be resolved', inject(['$http', function ($http) {
                    var votes = {t1: 3, t2: 5};

                    $httpBackend.expectPUT(boardUrl + '/12345/addVotes', {
                        themeIdVoteCollection: votes
                    }).respond(true);

                    var promise = boardService.sendVotes(12345, votes);
                    promise.then(function (res) {
                        assert.isTrue(res);
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Send Phase\' service call to be resolved', inject(['$http', function ($http) {
                    $httpBackend.expectPUT(boardUrl + '/12345/phase', {
                        phase: 2,
                        scrumMasterKey: 'scrumMasterKey'
                    }).respond(true);

                    var promise = boardService.putPhase(12345, 2, 'scrumMasterKey');
                    promise.then(function (res) {
                        assert.isTrue(res);
                    });

                    $httpBackend.flush();
                }]));

                it('should expect \'Save\' service call to be resolved', inject(['$http', function ($http) {
                    var board = {
                        _id: 12345,
                        title: 'testboard',
                        phase: 'well',
                        scrumMaster: 'scrumMaster',
                        scrumMasterKey: 'scrumMasterKey',
                        participants: [],
                        wellFeedback: [],
                        improveFeedback: [],
                        actionItems: [],
                        themes: ['theme1', 'theme2']
                    };

                    $httpBackend.expectPUT(boardUrl + '12345', {
                        user: 'user',
                        board: board
                    }).respond(board);

                    userProvider.setUser('user');
                    var promise = boardService.save(board);
                    promise.then(function (res) {
                        assert.deepEqual(res, board);
                    });

                    $httpBackend.flush();
                }]));
            });

            describe("User Provider Unit Tests", function () {
                it('should expect User Provider to Save User', function(done) {
                    userProvider.setUser('user');
                    expect(userProvider.getUser()).to.equal('user');
                    userProvider.setScrumMasterKey('scrumKey');
                    assert.isFalse(userProvider.isUserScrumMaster('notScrumKey', 'scrumKey'));
                    assert.isTrue(userProvider.isUserScrumMaster('scrumKey', 'scrumKey'));
                    done();
                });
            });
        });
    });
