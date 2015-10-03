'use strict';

var gulp        = require('gulp'),
    refresh     = require('gulp-livereload'),
    stylus      = require('gulp-stylus'),
    notify      = require('gulp-notify'),
    nodemon     = require('gulp-nodemon');

var paths = {
    styles: ['./client/styles/sty/*.styl'],

    assets: ['./client/assets/'],
    scripts: [
        './client/src/app/app.js',
        './client/src/**/*.js'
    ],
    html: [
        './public/src/**/*.html',
        './public/src/index.html',
        './public/src/cards/directiveTemplates/*.html'
    ],

    server: {
        js: ['./server/**/*.js'],
        specs: ['./server/cards/specs/*.js']
    }
};

// Run nodemon
gulp.task('serve', function(){
    nodemon({'script': 'index.js'});
});

gulp.task('templates', function() {
    return gulp.src('src/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(refresh( server ));
});