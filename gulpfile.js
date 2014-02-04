var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    minifyCSS = require('gulp-minify-css'),
    express = require('express');

gulp.task('server', function() {
  var app = express();
  app.use(express.static('./app'));
  app.get('*', function(req, res) {
    res.sendfile('./app/index.html');
  });
  app.listen(3000);
});

gulp.task('browserify', function() {
  gulp.src(['./src/js/app.js'])
      .pipe(browserify({
        shim: {
          'angular': {
            path: './vendor/angular/angular.js',
            exports: 'angular'
          },
          'angular-route': {
            path: './vendor/angular-route/angular-route.js',
            exports: 'angular'
          },
          'firebase': {
            path: './vendor/firebase/firebase.js',
            exports: 'firebase'
          },
          'angularfire': {
            path: './vendor/angularfire/angularfire.js',
            exports: 'angularfire'
          },
          'firebase-simple-login': {
            path: './vendor/firebase-simple-login/firebase-simple-login.js',
            exports: 'firebase'
          }
        }
      }))
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('./app/js'));
});

gulp.task('minify-css', function() {
  gulp.src('./src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./app/css'));
});

gulp.task('clean', function() {
  gulp.src('./app/js/bundle.js', {read: false})
      .pipe(clean());
});

gulp.task('default', function() {
  gulp.run('clean', 'minify-css', 'browserify', 'server');
});
