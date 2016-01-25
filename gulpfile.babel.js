// ----------------------------------
// Imports
// ----------------------------------

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import stylus from 'gulp-stylus';
import sourcemaps from 'gulp-sourcemaps';

// ----------------------------------
// Configuration
// ----------------------------------

const SOURCE          = './source/';
const DESTINATION     = './build/';

// ----------------------------------
// Paths
// ----------------------------------

const PATHS = {
  styles: {
    source: `${SOURCE}main.styl`,
    watch: `${SOURCE}**/*.styl`,
    destination: `${DESTINATION}styles/`
  },
  scripts: {
    source: `${SOURCE}main.js`,
    watch: `${SOURCE}**/*.js`,
    destination: `${DESTINATION}scripts/`
  }
};

// ----------------------------------
// Default Task
// ----------------------------------
gulp.task('default', ['watch']);

// ----------------------------------
// Scripts Task
// ----------------------------------
gulp.task('scripts', () => {
  return gulp.src(PATHS.scripts.source)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// ----------------------------------
// Styles Task
// ----------------------------------
gulp.task('styles', () => {
  return gulp.src(PATHS.styles.source)
    .pipe(sourcemaps.init())
      .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.styles.destination));
});

// ----------------------------------
// Watch
// ----------------------------------
gulp.task('watch', () => {
  gulp.watch(PATHS.scripts.source, ['scripts']);
  gulp.watch(PATHS.styles.source, ['styles']);
});
