/* global describe, it, before, beforeEach, after, afterEach, xdescribe, xit */
/* jslint node: true */
"use strict";

define(['jquery', 'chai', 'lodash','app', 'angular'],
    function($, chai, _,app, angular) {
    var expect = chai.expect;

    describe("Remote Retro Module Unit Tests", function() {
        var module;

        // Load the module with Controller to be tested
        beforeEach(function(){
            module = angular.module("remoteRetro");
        });

        it("should have RemoteRetro as a registered module", function() {
            expect(module).not.to.equal(null);
        });

        describe("Dependencies", function() {
            var deps;
            var hasModule = function(m) {
                return deps.indexOf(m) >= 0;
            };
            before(function() {
                deps = module.value('remoteRetro').requires;
            });

            it("should have Controllers as a dependency", function() {
                expect(hasModule('remoteRetro.controllers')).to.equal(true);
            });

            it("should have Directives as a dependency", function() {
                expect(hasModule('remoteRetro.directives')).to.equal(true);
            });

            it("should have Helpers as a dependency", function() {
                expect(hasModule('remoteRetro.helpers')).to.equal(true);
            });

            it("should have User Provider as a dependency", function() {
                expect(hasModule('remoteRetro.userProvider')).to.equal(true);
            });

            it("should have Board Service as a dependency", function() {
                expect(hasModule('remoteRetro.boardService')).to.equal(true);
            });

            it("should have Admin Service as a dependency", function() {
                expect(hasModule('remoteRetro.adminService')).to.equal(true);
            });

            it("should have Socket Factory as a dependency", function() {
                expect(hasModule('remoteRetro.socketFactory')).to.equal(true);
            });

            it("should have ngRoutes as a dependency", function() {
                expect(hasModule('ngRoute')).to.equal(true);
            });

            it("should have XEditable as a dependency", function() {
                expect(hasModule('xeditable')).to.equal(true);
            });

            it("should have Bootstrap as a dependency", function() {
                expect(hasModule('ui.bootstrap')).to.equal(true);
            });
        });
    });
});
