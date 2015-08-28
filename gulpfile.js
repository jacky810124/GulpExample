var gulp = require('gulp');
var compass = require('gulp-compass');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gutil = require('gulp-util');

/**
 * convert scss file to css file
 */
gulp.task('compass', function() {

    return gulp.src(__dirname + '/style/sass/*.scss')
        .pipe(compass({
            // sourcemap: true,
            time: true,
            css: __dirname + '/style/css/',
            sass: __dirname + '/style/sass/',
            style: 'compact'
        }))
        .pipe(gulp.dest(__dirname + '/style/css/'));
});

/**
 * minify css file and rename .css to .min.css
 */
gulp.task('minify', function() {

    return gulp.src(__dirname + '/style/css/index.css')
        .pipe(minify({
            compatibility: 'ie8'
        }))
        .pipe(rename(function(path) {
            path.basename += '.min';
            path.extname = '.css';
        }))
        .pipe(gulp.dest(__dirname + '/dist/css/'));
});

/**
 * Bundle all .js files
 */
gulp.task('concat', function() {

    return gulp.src(__dirname + '/script/*.js')
        .pipe(concat('bundle.js'))
        .pipe(rename(function(path) {
            path.basename += '.min';
            path.extname = '.js';
        }))
        .pipe(gulp.dest(__dirname + '/dist/js/'));
});


/**
 * Uglify bundle.min.js
 */
gulp.task('uglify', ['concat'], function() {

    return gulp.src(__dirname + '/dist/js/bundle.min.js')
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest(__dirname + '/dist/js/'));
});


/**
 * Run gulp task
 */
gulp.task('default', ['compass', 'minify', 'uglify']);
