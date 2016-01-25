// ----------------------------------
// Imports
// ----------------------------------

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import stylus from 'gulp-stylus';
import jade from 'gulp-jade';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

const server = browserSync.create();

// ----------------------------------
// Configuration
// ----------------------------------

const SOURCE          = './source/';
const DESTINATION     = './build/';

// ----------------------------------
// Paths
// ----------------------------------

const PATHS = {
  templates: {
    source: `${SOURCE}*.jade`,
    watch: `${SOURCE}*.jade`,
    destination: `${DESTINATION}`
  },
  styles: {
    source: `${SOURCE}stylus/main.styl`,
    watch: `${SOURCE}**/*.styl`,
    destination: `${DESTINATION}styles/`
  },
  scripts: {
    source: `${SOURCE}javascript/main.js`,
    watch: `${SOURCE}**/*.js`,
    destination: `${DESTINATION}scripts/`
  },
  images: {
    source: `${SOURCE}assets/**/*`,
    watch: `${SOURCE}assets/**/*`,
    destination: `${DESTINATION}assets/`
  }
};

// ----------------------------------
// Templates Task
// ----------------------------------
gulp.task('templates', () => {
  return gulp.src(PATHS.templates.source)
    .pipe(sourcemaps.init())
      .pipe(jade())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.templates.destination));
});


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
    .pipe(gulp.dest(PATHS.styles.destination))
    .pipe(server.stream());
});

// ----------------------------------
// Images Task
// ----------------------------------
gulp.task('images', () => {
  return gulp.src(PATHS.images.source)
    .pipe(imagemin())
    .pipe(gulp.dest(PATHS.images.destination));
});

// ----------------------------------
// Server Task
// ----------------------------------
gulp.task('serve', () => {
  server.init({
    server: {
      baseDir: './build'
    }
  });
});

// ----------------------------------
// Watch Task
// ----------------------------------
gulp.task('watch', () => {
  gulp.watch(PATHS.scripts.watch, ['scripts']);
  gulp.watch(PATHS.styles.watch, ['styles']);
  gulp.watch(PATHS.templates.watch, ['templates']);
  gulp.watch(PATHS.templates.watch).on('change', server.reload);
});

// ----------------------------------
// Default Task
// ----------------------------------
gulp.task('default', ['watch', 'serve']);
