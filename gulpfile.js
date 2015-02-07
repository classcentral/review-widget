var gulp      = require('gulp'),
    concat    = require('gulp-concat'),
    rename    = require('gulp-rename'),
    uglify    = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css');


// TODO @Dhawal: Add the CSS files in order
// that are to be concatenated
var fileOrder = [
  'assets/css/widget.css', 
];

gulp.task('css', function() {
  gulp.src(fileOrder)
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('build'))
      .pipe(minifyCSS())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('build'))
});

gulp.task('js', function() {
  gulp.src('widget.js')
    .pipe(uglify())
    .pipe(rename('widget.min.js'))
    .pipe(gulp.dest('build'))
});

// The default task (called when you run `gulp` from cli)
// TODO @Dhawal: Add 'css' below when ready
gulp.task('default', ['js']);
