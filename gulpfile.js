const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const makeCss = () => {
    return gulp
        .src('./src/css/app.scss')
        .pipe(
            sass.sync().on('error', (e) => {
                console.log(e);
            })
        )
        .pipe(
            uglifycss({
                uglyComments: true,
            })
        )

        .pipe(rename('app.min.css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('./dist/css'));
};

const makeJs = () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(
            javascriptObfuscator({
                compact: true,
                sourceMap: true,
            })
        )
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('./dist/js/'));
};

const make = (done) => {
    makeCss();
    makeJs();
    done();
};

const watch = (done) => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/css/*.scss', makeCss);
    gulp.watch('./src/js/*.js', makeJs);

    done();
};


gulp.task('css', makeCss);
gulp.task('js', makeJs);
gulp.task('make', make);
gulp.task('watch', watch);
gulp.task('default', gulp.series(make, watch));
