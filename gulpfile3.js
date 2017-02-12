var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    nodemon = require("gulp-nodemon");

/***********************************************************************************
 * Build es5 javascript files from typescript sources
 ***********************************************************************************/
gulp.task("compile", function() {
    var project = ts.createProject('tsconfig.json');
    return gulp.src("src/**/*.ts")
        .pipe(project())
        .pipe(gulp.dest("dist"))
});

/***********************************************************************************
 * Call "build" task and start nodemon with watch (autorestart on changes found)
 ***********************************************************************************/
gulp.task("default", ["compile"], function() {
    var stream = nodemon({
        script: "dist/index.js",
        watch: "src",
        tasks: ["compile"],
        env: { "DEBUG": "Application,Request,Response" }
    });
    return stream;
});