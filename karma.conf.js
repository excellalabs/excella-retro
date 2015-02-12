// Karma configuration
// Generated on Tue Feb 10 2015 10:08:30 GMT-0500 (EST)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
        // libs required for test framework, chai specifically has to be loaded here NOT in the framework section above.
        "node_modules/chai/chai.js",

        {pattern: 'shared/**/*.js', included: false},
        {pattern: 'lib/*.js', included: false},
        {pattern: 'node_modules/sinon-chai/**/*.js', included: false},
        {pattern: 'public/bower_components/**/*.js', included: false},
        {pattern: 'public/scripts/**/*.js', included: false},
        {pattern: 'public/js/app.js', included: false, served:true},


        //{pattern: 'public/templates/**/*.html', included: false},
        {pattern: "test/unit/client/*_tests.*", included: false},

        "test/unit/client/test-main.js"
    ],

    // list of files to exclude
    exclude: [
        'public/scripts/main/app.js',
        'app/bower_components/**/*min.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
