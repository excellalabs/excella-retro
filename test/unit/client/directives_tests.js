/* global describe, it, before, beforeEach, after, afterEach, xdescribe, xit */
/* jslint node: true */
"use strict";

define(['jquery', 'chai', 'sinon-chai', 'sinon', 'lodash', 'app', 'angular', 'angularMocks'],
    function ($, chai, sinonChai, sinon, _, app, angular, angMock) {
        chai.use(sinonChai);
        var expect = chai.expect;
        var assert = chai.assert;

        describe("Unit: Testing Directives", function () {
            var $compile, $scope, element, $httpBackend;

            beforeEach(module('remoteRetro'));

            beforeEach(inject(function (_$compile_, $rootScope, _$httpBackend_) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();
                    $httpBackend = _$httpBackend_;

                    element = $compile('<what-went-well board="board"></what-went-well>')($scope);
                }
            ));

            //Directives Tests Here! WIP

            it('welcomes the person', function () {
                $httpBackend.expectGET('').respond(200);

                $scope.isScrumMaster = true;
                $scope.board = {
                    id: 12345,
                    title: 'testboard',
                    phase: 'well-feedback-completed',
                    scrumMaster: 'scrumMaster',
                    scrumMasterKey: 'scrumMasterKey',
                    participants: [],
                    wellFeedback: ['fd1'],
                    improveFeedback: [],
                    actionItems: [],
                    themes: []
                };
                $scope.$digest();
               // console.log(element);
                //expect(element.find('span').text()).to.equal('Group feedback together by dragging');
                $httpBackend.flush();
            });
        });
    });

