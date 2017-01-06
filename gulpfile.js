'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    jade = require('gulp-jade');

var bc = './bower_components/';

gulp.task('js', function() {
    gulp.src('builds/src/app/**/*.js')
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(gulp.dest('builds/dest/app/'))
        .pipe(connect.reload());
});

gulp.task('jade', function() {
    gulp.src('builds/src/**/*.jade')
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest('builds/dest/'))
      .pipe(connect.reload());
});

gulp.task('scss', function() {
    gulp.src('builds/src/scss/**/*')
        .pipe(scss())
        .pipe(concat('css.min.css'))
        .pipe(cleanCSS({
            processImport: false
        }))
        .pipe(gulp.dest('builds/dest/css/'))
        .pipe(connect.reload());
});

gulp.task('img', function() {
    gulp.src('builds/src/img/**/*')
        .pipe(gulp.dest('builds/dest/img/'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('builds/src/app/**/*.js', ['js']);
    gulp.watch('builds/src/scss/**/*.scss', ['scss']);
    gulp.watch('builds/src/**/*.jade', ['jade']);
    gulp.watch('builds/src/img/**/*', ['img']);
});

gulp.task('vendor', function() {
    gulp.src(bc + 'components-font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('./builds/dest/vendor/fa/css'));
    gulp.src(bc + 'components-font-awesome/fonts/*')
        .pipe(gulp.dest('./builds/dest/vendor/fa/fonts'));

    gulp.src(bc + 'jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./builds/dest/vendor/jquery/'));

    gulp.src(bc + 'bootstrap/dist/**/*.*')
        .pipe(gulp.dest('./builds/dest/vendor/bootstrap/'));

    gulp.src(bc + 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css')
        .pipe(gulp.dest('./builds/dest/vendor/bootstrap-material-design/'));

    gulp.src([
            bc + 'angular/angular.js',
            bc + 'angular-ui-router/release/angular-ui-router.js',
            bc + 'firebase/firebase.js',
            bc + 'angularfire/dist/angularfire.min.js'
        ])
        .pipe(concat('angular.concat.js'))
        .pipe(gulp.dest('./builds/dest/vendor/angular/'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/dest/',
    livereload: true
  });
  opn('http://localhost:8080');
});

gulp.task('default', [
    'vendor',
    'jade',
    'img',
    'js',
    'scss',
    'connect',
    'watch'
]);