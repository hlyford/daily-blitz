// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
// image minifying libraries
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./server/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './client/src/images/**/*',
      imgDst = './client/dist/images/';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// do all tests
gulp.task('test', ['jshint'], function() {
	console.log('Test results: ');
});

// more: https://www.sitepoint.com/introduction-gulp-js/