'use strict';

var Path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify-css');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function() {
  gulp.src('./stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(minify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(reload({ stream:true }));
});

gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });

  gulp.watch(['*.html'], reload);
  gulp.watch('./stylesheets/**/*.scss', ['sass']);
});

gulp.task('sass:watch', function() {
  gulp.watch('./stylesheets/**/*.scss', ['sass']);
});

gulp.task('build', ['sass']);

gulp.task('default', ['build']);
