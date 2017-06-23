/**
 * @fileoverview gulpfile
 * @author burning (www.cafeinit.com)
 * @version 2017.06.22
 */

'use strict'

const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const less = require('gulp-less')
const LessAutoprefix = require('less-plugin-autoprefix')
const pug = require('gulp-pug')

const autoprefix = new LessAutoprefix({ browsers: ['last 5 versions'] })

// tasks
gulp.task('default', ['views', 'style', 'copy'])

gulp.task('views', () => {
  return gulp.src([
    './src/views/*.pug'
  ])
    .pipe(pug({
      data: {
        time: Date.now()
      }
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('style', () => {
  return gulp.src([
    './src/style/main.less'
  ])
    .pipe(less({
      plugins: [ autoprefix ]
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/style'))
})

gulp.task('copy', () => {
  return gulp.src([
    '../dist/*'
  ])
    .pipe(gulp.dest('./dist/style'))
})
