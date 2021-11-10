'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');

gulp.task('css', function () {
  return gulp.src('src/css/*.css')
    .pipe(plumber())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/css/**/*.css', gulp.series('css'));
  gulp.watch('src/*.html', gulp.series('html', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('public'));
});

gulp.task('copy', function () {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/images/**',
    'src/js/**',
    'src//*.ico'
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('public'));
});

gulp.task('clean', function () {
  return del('public');
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'html'));
gulp.task('start', gulp.series('build', 'server'));