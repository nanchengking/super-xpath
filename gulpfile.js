var gulp = require('gulp');
var jade = require('gulp-jade');
var browserify = require('gulp-browserify');
var ugly = require('gulp-uglify');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

var env = process.env.NODE_ENV || 'development';
var outputDir = 'build';
gulp.task('jade', function () {
    return gulp.src('src/templates/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(outputDir+'/html'))
})

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(browserify({debug: env === 'development'}))
        .pipe(gulpif(env === 'production', ugly()))
        .pipe(gulp.dest(outputDir + '/js'))
})

gulp.task('sass', function () {
    var config = {}
    if (env === 'development') {
        config.sourceComments = 'map';
    }
    if (env === 'production') {
        config.outputStyle = 'compressed';
    }
    return gulp.src('src/sass/main.sass')
        .pipe(sass(config))
        .pipe(gulp.dest(outputDir + '/css'))
})

gulp.task('imagemin', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(outputDir+'/images'))
})

gulp.task('watch', function () {
    gulp.watch('src/templates/**/*.jade', ['jade']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('src/images/*', ['imagemin']);

})


gulp.task('default', ['js', 'sass', 'jade','imagemin','watch'])