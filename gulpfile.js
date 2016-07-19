const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const protractor = require('gulp-protractor').protractor;
const webpack = require('webpack-stream');
const KarmaServer = require('karma').Server;
const maps = require('gulp-sourcemaps');

var files = {
  server: ['server/**/*.js', 'index.js', 'gulpfile.js'],
  app: ['app/**/*.js'],
  serverTest: ['test/**/*test.js']
};

// lint tasks
gulp.task('lint:server', () => {
  return gulp.src(files.server)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lint:app', () => {
  return gulp.src(files.app)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lint', ['lint:server', 'lint:app']);

// build dev tasks
gulp.task('webpack:dev', ['lint'], () => {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    devtool: 'sourcemap',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  return gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('build', ['webpack:dev', 'static:dev', 'css:dev']);

// build test task
gulp.task('webpack:test', ['lint'], () => {
  return gulp.src('test/unit/test_entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./test'));
});

// test tasks
gulp.task('mocha', () => {
  return gulp.src(files.serverTest)
  .pipe(mocha());
});

gulp.task('karma', ['webpack:test'], (done) => {
  new KarmaServer({
    configFile: __dirname + '/karma.config.js'
  }, done).start();
});

gulp.task('test', ['mocha', 'karma']);
