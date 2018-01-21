const gulp = require('gulp');
const cssnested = require('postcss-nested')
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const csswring = require('csswring');
const atImport = require('postcss-import');
const mqpacker = require('css-mqpacker');
const browserSync = require('browser-sync').create();

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
			cssnested(),
			cssnext({ browsers: ['> 5%', 'ie 8']}),
			mqpacker(),
			//csswring()
		];

	return gulp.src('./src/styles.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

//Tarea para vigilar los cambios
gulp.task('watch', function(){
	gulp.watch('./src/*.css', ['css']);
	gulp.watch('./dist/*.html').on('change', browserSync.reload)
});

gulp.task('default', ['watch', 'serve']);