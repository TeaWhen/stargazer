var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var bower = require('gulp-bower-files');

gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('vendor', function() {
  return bower().pipe(gulp.dest("vendor"));
})

gulp.task('minify', function(){
  return gulp.src('src/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['lint', 'minify']);
});

gulp.task('default', ['vendor', 'lint', 'minify', 'watch']);
