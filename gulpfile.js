var gulp = require('gulp');
var compass = require('gulp-compass');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
//var bower = require('gulp-bower');
var bundle = require('gulp-bundle-assets');

/**
 * convert scss file to css file
 */
gulp.task('compass', function () {

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
gulp.task('minify', function () {

    return gulp.src(__dirname + '/style/css/index.css')
        .pipe(minify({
            compatibility: 'ie8'
        }))
        .pipe(rename(function (path) {
            path.basename += '.min';
            path.extname = '.css';
        }))
        .pipe(gulp.dest(__dirname + '/dist/css/'));
});

/**
 * Bundle all .js files
 */
gulp.task('concat', function () {

    return gulp.src(__dirname + '/script/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(__dirname + '/script/'));
});


/**
 * Uglify bundle.min.js
 */
gulp.task('uglify',['concat'], function () {

    return gulp.src(__dirname + '/script/bundle.js')
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename(function (path) {
            path.basename += '.min';
            path.extname = '.js'
        }))
        .pipe(gulp.dest(__dirname + '/dist/js/'));
});


/**
 * Minify image
 */

gulp.task('imageminify', function () {

    return gulp.src(__dirname + '/image/*.*')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 1
        }))
        .pipe(gulp.dest(__dirname + '/image/min/'));
});



/**
 * Bundle all vendor js
 */

gulp.task('bundle', function () {

    return gulp.src(__dirname + '/bundle.config.js')
        .pipe(bundle().on('error', gutil.log))
        .pipe(gulp.dest(__dirname + '/dist/js/'));
})



/**
 * Bower insall
 */

//gulp.task('bower', function () {
//
//    return bower({
//        cmd: 'install'
//    });
//});


/**
 * Run gulp task
 */
gulp.task('default', ['compass', 'minify', 'uglify', 'imageminify', 'bundle']);
