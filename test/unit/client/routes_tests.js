/* global describe, it, before, beforeEach, after, afterEach, xdescribe, xit */
/* jslint node: true */
"use strict";

define(['jquery', 'chai', 'app', 'angular', 'angularMocks'],
    function ($, chai, app, angular, angMock) {
        var expect = chai.expect;

        describe("Unit: Testing Routes", function() {
            var $compile, $scope, $route, $location, $httpBackend;

            beforeEach(module('remoteRetro'));

            beforeEach(inject(function(_$compile_,$rootScope, $controller, _$route_, _$location_, _$httpBackend_) {
                    $compile = _$compile_;
                    $scope = $rootScope;
                    $route = _$route_;
                    $location = _$location_;
                    $httpBackend = _$httpBackend_;
                }
            ));

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should set the route controller & load the correct template', function(done) {
                $httpBackend.expectGET('').respond(200);

                $location.path('/');
                $scope.$digest();
                expect($route.current.controller).to.equal('HomeController');
                expect($route.current.loadedTemplateUrl).to.equal('/templates/home.html');

                $location.path(null);
                $scope.$digest();
                expect($route.current.controller).to.equal('HomeController');
                expect($route.current.loadedTemplateUrl).to.equal('/templates/home.html');

                $location.path('');
                $scope.$digest();
                expect($route.current.controller).to.equal('HomeController');
                expect($route.current.loadedTemplateUrl).to.equal('/templates/home.html');

                $location.path('fakeUrl');
                $scope.$digest();
                expect($route.current.controller).to.equal('HomeController');
                expect($route.current.loadedTemplateUrl).to.equal('/templates/home.html');
                $httpBackend.flush();

                $httpBackend.expectGET('/templates/retroWizard.html').respond(200);
                $location.path('/retro');
                $scope.$digest();
                expect($route.current.controller).to.equal('BoardController');
                expect($route.current.loadedTemplateUrl).to.equal('/templates/retroWizard.html');
                $httpBackend.flush();

                $httpBackend.expectGET('/templates/join.html').respond(200);
                $location.path('/retro/23455/join');
                $scope.$digest();
                expect($route.current.controller).to.equal('JoinController');
                expect($route.current.loadedTemplateUrl).to.equal('/templates/join.html');

                $httpBackend.expectGET('/templates/joinAsScrumMaster.html').respond(200);
                $location.path('/retro/23455/scrumMasterKey');
                $scope.$digest();
                expect($route.current.controller).to.equal('ScrumMasterController');
                expect($route.current.loadedTemplateUrl).to.equal('/templates/joinAsScrumMaster.html');

                $httpBackend.expectGET('/templates/tos.html').respond(200);
                $location.path('/tos');
                $scope.$digest();
                expect($route.current.controller).to.be.undefined;
                expect($route.current.loadedTemplateUrl).to.equal('/templates/tos.html');
                $httpBackend.flush();

                $httpBackend.expectGET('/templates/close.html').respond(200);
                $location.path('/closed');
                $scope.$digest();
                expect($route.current.controller).to.equal('CloseViewModel');
                expect($route.current.loadedTemplateUrl).to.equal('/templates/close.html');
                $httpBackend.flush();

                done();
            });
        });
    });

