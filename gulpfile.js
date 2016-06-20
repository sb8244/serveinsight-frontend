/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var shell = require('gulp-shell');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('production:pre', shell.task([
  'cp -f secrets/production.js src/app/constants.js'
]));

gulp.task('production', ['clean'], function () {
  gulp.start('build');
});

gulp.task('production:post', shell.task([
  'rm -f ../backend/public/scripts/* ./backend/public/styles/* ./backend/public/fonts/*',
  'rm -rf ../backend/public/maps/*',
  'cp dist/scripts/* ../backend/public/scripts/',
  'cp dist/styles/* ../backend/public/styles/',
  'cp -R dist/maps/* ../backend/public/maps/',
  'cp dist/fonts/* ../backend/public/fonts',
  'cp dist/index.html ../backend/app/views/layouts/ng.html',
  'cp -f secrets/development.js src/app/constants.js'
]));
