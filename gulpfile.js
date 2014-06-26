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
  return bower()
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
})

gulp.task('minify', function(){
  return gulp.src('src/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['lint', 'minify']);
  gulp.watch('src/*.html', ['erbify']);
});

gulp.task('erbify', function() {
  gulp.src('src/user.html')
    .pipe(rename('user.erb'))
    .pipe(gulp.dest('views'));
  gulp.src('src/index.html')
    .pipe(rename('index.erb'))
    .pipe(gulp.dest('views'));
});

gulp.task('default', ['vendor', 'lint', 'minify', 'watch', 'erbify']);
