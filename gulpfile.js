const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const csswring = require('csswring');
const atImport = require('postcss-import');
const mqpacker = require('css-mqpacker');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const nested  = require('postcss-nested');
//const babel = require('gulp-babel');

//Servidor local
gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	})
})

//Tarea para procesar el css
gulp.task('css', function(){
	const processors = [
			atImport(),
			cssnext({ browsers: ['> 5%', 'ie 8']}),
			nested(),
			mqpacker(),
			csswring()
		];

	return gulp.src('./src/styles.css')
		.pipe(postcss(processors))
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

//Tarea para procesar el JS
gulp.task('js', function(){
  return gulp.src('./src/*.js')
    .pipe(sourcemaps.init())
    // .pipe(babel({
    // 	presets: ['env']
    // }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

//Tarea para vigilar los cambios
gulp.task('watch', function(){
	gulp.watch('./src/*.css', ['css']);
	gulp.watch('./src/*.js', ['js']);
	gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'serve']);