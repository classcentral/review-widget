const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

exports.prod = (cb) => {
  gulp.src(['src/config.prod.js','assets/iframeResizer.min.js','src/widget.js'])
    .pipe(concat('widget.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'))
  ;
  cb();
}

exports.dev = (cb) => {
  gulp.src(['src/config.dev.js','assets/iframeResizer.min.js','src/widget.js'])
    .pipe(concat('widget.dev.js'))
    .pipe(gulp.dest('build'))
  ;
  cb();
}