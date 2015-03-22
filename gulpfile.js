var gulp      = require('gulp'),    
    rename    = require('gulp-rename'),
    uglify    = require('gulp-uglify'),
    concat    = require('gulp-concat');



gulp.task('js', function() {


  gulp.src( ['assets/iframeResizer.min.js','widget.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename('widget.min.js'))
    .pipe(gulp.dest('build'))
});

// The default task (called when you run `gulp` from cli)
// TODO @Dhawal: Add 'css' below when ready
gulp.task('default', ['js']);
