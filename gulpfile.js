'use strict';

var gulp        = require('gulp'),
    refresh     = require('gulp-livereload'),
    stylus      = require('gulp-stylus'),
    jade        = require('gulp-jade'),
    nodemon     = require('gulp-nodemon'),
    notify      = require('gulp-notify'),
    tinylr      = require('tiny-lr'),
    browserSync = require('browser-sync'),
    server      = tinylr(),
    lrPort      = 35729;

var paths = {
    public: ['./public/**/*.*'],
    styles: ['./public/stylesheets/*.styl'],
    templates: ['./views/*.jade']
};

gulp.task('browsersync', ['serve'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:8080",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
});

// Run nodemon
gulp.task('serve', function(){
    nodemon({'script': 'app.js'});
});

gulp.task('templates', function() {
    return gulp.src(paths.templates)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./views'))
        .pipe(refresh( server ));
});

gulp.task('stylus', function(){
    return gulp.src(paths.styles)
        .pipe(stylus())
        .pipe(gulp.dest('./public/css'))
        .pipe(refresh(server));
});

gulp.task('lr', function(){
    server.listen(lrPort, function(err){
        if(err) {return console.error(err);}
    });
});

gulp.task('watch', function(){
    refresh.listen();
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.styles, ['stylus']);
    refresh.changed('./views/index.html');
});

gulp.task('default', ['browsersync','stylus', 'lr', 'templates', 'serve','watch']);