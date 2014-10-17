/* jslint node: true */
'use strict';

// dependencies
var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var less        = require('gulp-less');
var sourcemaps  = require('gulp-sourcemaps');
var colorMaps   = require('./less/gulpLessColorMaps');


var isProduction = false;

// scripts task
gulp.task('scripts', function() {
  return gulp.src('public/scripts/main/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !isProduction,
      shim:{
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

gulp.task('less', function(){
    gulp.src('./less/app.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            //modifyVars: colorMaps
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
    gulp.src('./public/bower_components/bootstrap/dist/fonts/*.*').pipe(gulp.dest('./public/fonts'));
});

gulp.task('watch', function(){
    gulp.watch('public/scripts/**/*.js', ['scripts']);
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('less/gulpLessColorMaps.js', ['less']);
});

gulp.task('default', ['scripts', 'less']);
