/* global describe, it, before, beforeEach, after, afterEach, xdescribe, xit */
/* jslint node: true */
"use strict";

define(['jquery', 'chai', 'lodash','app', 'angularMocks'], function($, chai, _,app, angMock) {

    var expect = chai.expect;
    var assert = chai.assert;

    describe("A test suite", function() {
        // Load the module with Controller to be tested
        beforeEach(module('remoteRetro'));

        afterEach(function() { });

        var ctrl, scope;

        // inject the $controller and $rootScope services
        // in the beforeEach block
        beforeEach(inject(function($controller, $rootScope) {
            // Create a new scope that's a child of the $rootScope
            scope = $rootScope.$new();
            // Create the controller
            ctrl = $controller('HomeController', {
                $scope: scope
            });
        }));

        it('should pass', function() {
            expect(false).to.be.false;
        });

        //it('grabs variable from scope', function() {
        //    expect(scope.testResponse).to.equal('test');
        //});
    });
});
