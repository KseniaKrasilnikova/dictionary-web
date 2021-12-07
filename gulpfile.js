'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const del = require('del');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');

gulp.task('js-develop', () =>
  gulp.src('src/js/*.js')
    .pipe(webpack({
      mode: 'development'
    }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('public/js'))
);

gulp.task('js-production', () =>
  gulp.src('src/js/*.js')
    .pipe(webpack({
      mode: 'production'
    }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('public/js'))
);

gulp.task('css', () =>
  gulp.src('src/css/*.css')
    .pipe(plumber())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(server.stream()));

gulp.task('server', () => {
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

gulp.task('refresh', done => {
  server.reload();
  done();
});

gulp.task('html', () =>
  gulp.src('src/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('public')));

gulp.task('copy', () =>
  gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/images/**',
    'src//*.ico',
    'src/data/audio/*.*',
    'src/data/words.json',
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('public')));

gulp.task('copy-desktop', () =>
  gulp.src('src/data/desktop-dist/*.*')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('public')));

gulp.task('clean', () => del('public'));

gulp.task('build-dev', gulp.series('clean', 'copy', 'js-develop', 'css', 'html'));
gulp.task('build', gulp.series('clean', 'copy', 'copy-desktop', 'js-production', 'css', 'html'));
gulp.task('start', gulp.series('build', 'server'));