/**
 * @fileoverview gulpfile
 * @author burning (www.cafeinit.com)
 * @version 2017.06.22
 */

'use strict'

const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const header = require('gulp-header')
const less = require('gulp-less')
const LessAutoprefix = require('less-plugin-autoprefix')
const rename = require('gulp-rename')
const pkg = require('./package.json')

const autoprefix = new LessAutoprefix({ browsers: ['last 5 versions'] })
const banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' * @copyright 2017 CafeInit.',
  ' */',
  ''
].join('\n')

// tasks
gulp.task('default', ['build'])

gulp.task('build', () => {
  return gulp.src([
    './src/main.less'
  ])
    .pipe(less({
      plugins: [ autoprefix ]
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename('ci-ui-base.css'))
    .pipe(gulp.dest('./dist'))
})
