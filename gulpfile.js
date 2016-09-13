var gulp = require('gulp')
var mocha = require('gulp-mocha');
var server = require('gulp-express');

gulp.task('test', function() {
  var error = false;
  gulp.
    src('./test.js').
    pipe(mocha()).
    on('error', function() {
      console.log('Tests failed!');
      error = true;
    }).
    on('end', function() {
      if (!error) {
        console.log('Tests succeeded!');
        process.exit(0);
      }
    });
})

gulp.task('runTest', function() {
  gulp.watch(['./*.js'], ['test'])
})

gulp.task('run', function() {
  server.run(['index.js'], [{livereload: 3000}]);
  gulp.watch(['./index.js'], [server.run]);
})

gulp.task('watch', function() {
  gulp.watch(['./*.js'], ['run'])
})
