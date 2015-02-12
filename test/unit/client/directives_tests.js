/* global describe, it, before, beforeEach, after, afterEach, xdescribe, xit */
/* jslint node: true */
"use strict";

define(['jquery', 'chai', 'sinon-chai', 'sinon', 'lodash', 'app', 'angular', 'angularMocks'],
    function ($, chai, sinonChai, sinon, _, app, angular, angMock) {
        chai.use(sinonChai);
        var expect = chai.expect;
        var assert = chai.assert;

        describe("Unit: Testing Directives", function() {

            var $compile, $rootScope;

            beforeEach(module('remoteRetro'));

            beforeEach(inject(['$compile','$rootScope', function($c, $r) {
                    $compile = $c;
                    $rootScope = $r;
                }]
            ));

            //Directives Tests Here!

        });
    });

