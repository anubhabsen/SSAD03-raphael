var gulp = require('gulp');
var prettyData = require('gulp-pretty-data');

gulp.task('minify', function() {
  gulp.src('Source/AIML Dataset/*.aiml')
    .pipe(prettyData({type: 'minify', preserveComments: true}))
    .pipe(gulp.dest('Source/builds'))
});
