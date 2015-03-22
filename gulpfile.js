var gulp      = require('gulp'),    
    rename    = require('gulp-rename'),
    uglify    = require('gulp-uglify'),
    concat    = require('gulp-concat');

gulp.task('js', function() {

  gulp.src( ['src/config.js','assets/iframeResizer.min.js','src/widget.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename('widget.min.js'))
    .pipe(gulp.dest('build'))
   ;

});



gulp.task('default', ['js']);
