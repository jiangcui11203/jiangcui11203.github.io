const gulp = require('gulp');

const sass = require('gulp-sass')(require('dart-sass'));

const ts = require('gulp-typescript');
const tsProject = ts.createProject('configs/tsconfig.json');

const cleanCSS = require('gulp-clean-css');

const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;

const htmlmin = require('gulp-htmlmin');

const concat = require('gulp-concat');

function minifyPages() {
    return gulp.src('pages/**/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./'));
}

let shouldMinify = true;

function buildStyles() {
    shouldMinify = true;
    return gulp.src('styles/sass/**/*.scss')
        .pipe(sass().on('error', function (err) {
            console.error('SASS Compilation Error:', err.message);
            shouldMinify = false;
            this.emit('end');
        }))
        .pipe(gulp.dest('styles/css'));
}

function minifyStyles(done) {
    if (!shouldMinify) {
        console.warn('Skipping CSS minification due to SASS errors.');
        return done();
    }
    return gulp.src('styles/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('styles/css'));
}

const processStyles = gulp.series(buildStyles, minifyStyles);

function buildScripts() {
    return gulp.src('scripts/ts/**/*.ts')
        .pipe(tsProject({ noImplicitAny: true }))
        .pipe(gulp.dest('scripts/js'));
}

function minifyScripts() {
    return pipeline(
        gulp.src('scripts/**/*.js'),
        uglify(),
        gulp.dest('scripts/')
    );
}

const processScripts = gulp.series(buildScripts);

function watchTasks() {
    gulp.watch(['pages/**/*.html'], minifyPages);
    gulp.watch(['styles/sass/**/*.scss'], processStyles);
    gulp.watch(['scripts/ts/**/*.ts'], processScripts);
}

exports.default = gulp.series(minifyPages, processStyles, processScripts, watchTasks);