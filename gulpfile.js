/* jslint node: true */
'use strict';

// dependencies
var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var less        = require('gulp-less');
var sourcemaps  = require('gulp-sourcemaps');


var isProduction = false;

// scripts task
gulp.task('scripts', function() {
  return gulp.src('public/scripts/main/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !isProduction
    }))
    .pipe(gulp.dest('public/js'));
});

gulp.task('less', function(){
    gulp.src('./less/app.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            modifyVars: {
                // here we can modify the colors baked into bootstrap
                //'@brand-primary': '#FF0000'
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
    gulp.src('./public/bower_components/bootstrap/dist/fonts/*.*').pipe(gulp.dest('./public/fonts'));
});

gulp.task('default', ['scripts', 'less']);
