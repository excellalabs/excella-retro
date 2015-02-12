var tests = [];

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
       // console.log(file);
        if (/\_tests\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

//RequireJS configuation to inject these dependencies into test files.
requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/public',

    paths: {
        "chai": "../node_modules/chai/chai.js",
        "chai-as-promised": "../node_modules/chai-as-promised/lib/chai-as-promised",
        "sinon-chai": "../node_modules/sinon-chai/lib/sinon-chai",
        "sinon": "../lib/sinon-1.12.2", //Using precompiled version of sinon as bower version caused intermitted errors loading all the dependencies for requireJs
       'jquery': 'bower_components/jquery/dist/jquery',
        'app': 'js/app',
        'angular': 'bower_components/angular/angular',
        'angularMocks': 'bower_components/angular-mocks/angular-mocks',
        'lodash': 'bower_components/lodash/dist/lodash'
    },

    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angularMocks': {
            deps: ['angular'],
            'exports': 'angular.mock'
        },
        'lodash': {
            exports: '_'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});