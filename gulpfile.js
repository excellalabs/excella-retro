/* jslint node: true */
'use strict';

// dependencies
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var mocha = require('gulp-mocha');
var colorMaps = require('./less/gulpLessColorMaps');
var nodemon = require('gulp-nodemon');
//var protractor = require("gulp-protractor").protractor;
var karma = require('karma').server;
var path = require('path');
var karmaConf = path.resolve('karma.conf.js');


var isProduction = false;

// scripts task
gulp.task('scripts', function () {
    return gulp.src('public/scripts/main/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: !isProduction,
            shim: {
                jquery: {
                    path: 'public/bower_components/jquery/dist/jquery.js',
                    exports: '$'
                },
                angular: {
                    path: 'public/bower_components/angular/angular.js',
                    exports: 'angular',
                    depends: {
                        jquery: 'jQuery'
                    }
                },
                bootstrap: {
                    path: 'public/bower_components/bootstrap/dist/js/bootstrap.js',
                    exports: null,
                    depends: {
                        jquery: 'jQuery'
                    }
                },
                'ui-bootstrap': {
                    path: 'public/bower_components/angular-bootstrap/ui-bootstrap.js',
                    exports: null,
                    depends: {
                        angular: 'angular'
                    }
                },
                'ui-bootstrap-tpls': {
                    path: 'public/bower_components/angular-bootstrap/ui-bootstrap-tpls',
                    exports: null,
                    depends: {
                        angular: 'angular',
                        'ui-bootstrap': null
                    }
                },
                'interact': {
                    path: 'public/bower_components/interact/interact.js',
                    exports: 'interact'
                },
                'angular-xeditable': {
                    path: 'public/bower_components/angular-xeditable/dist/js/xeditable.js',
                    exports: null,
                    depends: {
                        angular: 'angular'
                    }
                },
                'angular-route': {
                    path: 'public/bower_components/angular-route/angular-route',
                    exports: null,
                    depends: {
                        angular: 'angular'
                    }
                },
                lodash: {
                    path: 'public/bower_components/lodash/dist/lodash',
                    exports: '_'
                },
                'bootstrap-wizard': {
                    path: 'public/bower_components/bootstrap-wizard/jquery.bootstrap.wizard.js',
                    exports: null,
                    depends: {
                        jquery: 'jQuery',
                        bootstrap: 'bootstrap'
                    }
                }
            }
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('less', function () {
    gulp.src('./less/app.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            modifyVars: colorMaps
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
    gulp.src('./public/bower_components/bootstrap/dist/fonts/*.*').pipe(gulp.dest('./public/fonts'));
});

gulp.task('watch', function () {
    gulp.watch('public/scripts/**/*.js', ['scripts']);
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('less/gulpLessColorMaps.js', ['less']);
});

var nodemon_instance;
gulp.task('dev_config', ['scripts', 'less'], function () {
    if (!nodemon_instance) {
        nodemon_instance = nodemon({
            script: 'server.js',
            watch: '__manual_watch__',
            ext: '__manual_watch__',
            verbose: true,
            "env": {
                "NODE_ENV": "development"
            }
        })
            .on('restart', function () {
                console.log('Server Restarted!');
            });
    } else {
        nodemon_instance.emit('restart');
    }
});

gulp.task('dev', ['dev_config'], function () {
    return gulp.watch(['server/**', 'public/scripts/**'], ['dev_config']);
});

gulp.task('test', ['scripts', 'less'],  function () {
    return gulp.src('./test/unit/server/*.js', {read: false})
        .pipe(mocha()).on('end', function(){
            gulp.run('karma');
        });
});

gulp.task('karma', function (done) {
    karma.start({
        configFile: karmaConf,
        singleRun: true
    }, done);
});

gulp.task('default', ['scripts', 'less']);


