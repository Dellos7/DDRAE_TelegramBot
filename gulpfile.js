var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');


gulp.task('default', ['ts', 'watch']);

// Compile typescript sources
gulp.task('ts', function() {
    var project = ts.createProject('tsconfig.json');
	gulp.src(['src/**/*.ts'])
		.pipe(project())
		.js
		.pipe(gulp.dest('./dist'));
});

//Watch for changes in typescript sources
gulp.task('watch', function() {
	gulp.watch('./src/**/*.ts', ['ts']);
});

//Restart server whenever a file changes
gulp.task('nodemon', ['ts', 'watch'], function() {
	nodemon({script: './dist/index.js'});
});