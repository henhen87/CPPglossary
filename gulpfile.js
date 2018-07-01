const webpack      = require('webpack');
const gutil        = require('gulp-util');
const gulp         = require('gulp');
const watch        = require('gulp-watch');
const less         = require('gulp-less');
const cleanCSS     = require('gulp-clean-css');
const uglify       = require('gulp-uglify');
const postcss      = require('gulp-postcss');
const del          = require('del');
const pump         = require('pump');
const yargs        = require('yargs');
const autoprefixer = require('autoprefixer');
const browserSync  = require('browser-sync').create();

const config = require('./webpack.config');

function webpackLogger (err, stats) {
	if (err) { throw new gutil.PluginError('webpack', err); }
	gutil.log('[webpack]', stats.toString({
		chunks: false,
		colors: true
	}));
}

gulp.task('watch-js', function() {
	webpack(config).watch({aggregateTimeout: 300, poll: true}, webpackLogger);
});

gulp.task('build-js', function() {
	webpack(config).run(webpackLogger);
});

gulp.task('watch-less', function(cb) {
	return watch(['./app/views/less/**/*.less'], function(e) {
		return gulp.src(e.path)
			.pipe(less())
			.pipe(postcss([ autoprefixer() ]))
			.pipe(gulp.dest('./public/css'))
			.pipe(browserSync.reload({
			    stream: true
		    }))
	});
});

gulp.task('build-less', function(cb) {
   return gulp.src('./app/views/less/**/*.less')
	   .pipe(less())
	   .pipe(cleanCSS())
	   .pipe(postcss([ autoprefixer() ]))
	   .pipe(gulp.dest('./public/css'))
});

gulp.task('clean', function(cb) {
	del(['./public/js/*.js', './public/css/*.css', './public/js-dev', './public/css-dev'], cb);
});

gulp.task('watch', ['watch-js','watch-less']);
gulp.task('build', ['build-js', 'build-less']);

gulp.task('default', function () {
	console.log('gulp????????????????');
});