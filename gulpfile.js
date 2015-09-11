/* jslint node: true */
'use strict';

// dependencies
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var mocha = require('gulp-mocha');
var colorMaps = require('./less/gulpLessColorMaps');
var nodemon = require('gulp-nodemon')
var jshint = require('gulp-jshint');
var html2js = require('gulp-html2js');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var isProduction = false;

var isWindows = process.platform === 'win32';


function stopNode(){
    if(isWindows) {
        exec('taskkill /IM node.exe -F');
    } else {
        exec('killall -9 node');
    }
}

gulp.task('bundle-html', function(){
    return gulp.src('app/**/*.html')
        .pipe(html2js({
            outputModuleName: 'templates',
            base: 'app',
            rename: function(name) { return name },
            useStrict: true,
            singleModule: true,
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('app/scratch'));
});

// scripts task
gulp.task('build', ['bundle-html', 'less'], function () {
    return gulp.src('app/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: !isProduction
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
    gulp.src('./node_modules/bootstrap/dist/fonts/*.*').pipe(gulp.dest('./public/fonts'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch(['./app/**/*.js', '!./app/tmp/**.js', './app/**/*.html',
        './less/**/*.less', './less/gulpLessColorMaps.js'], ['build']);
});

gulp.task('lr', function() {
    livereload.listen();
});

gulp.task('dev', ['build', 'lr'], function () {
    nodemon({
            script: 'server.js',
            //stdout: false,
            ext: 'js html css scss less',
            tasks: ['build'],
            "env": {
                "NODE_ENV": "development"
            }
        })
        .on('start', function() {
            setTimeout(function() {
                console.log('reloading on 2s delay...');
                livereload.reload();
            }, 2000);
            console.log('starting...');
        })
        .on('restart', function () {
            console.log('Server Restarted!');
        });
});

gulp.task('test', function () {
    return gulp.src('./test/**/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('lint', function () {
    gulp.src(['./server/**/*.js','./app/**/*.js', '!./app/tmp/**.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('node-stop', function(){
    console.log('stopping node...');
    stopNode();
});

gulp.task('default', ['build']);
