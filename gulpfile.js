var del = require('del')
var gulp = require('gulp')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var sasslint = require('@18f/stylelint-rules')
require('dotenv').config()

var paths = {
  sassvars: './src/sass',
  sass: {
    rules: {
      config: '../../../stylelint.config.js'
    },
    vars: './src/sass',
    local: [
      './src/**/*.s+(a|c)ss',
      './src/sass/print.scss'
    ],
    global: [
      './node_modules/font-awesome/**/*.s+(a|c)ss',
      './node_modules/uswds/src/stylesheets/**/*.s+(a|c)ss'
    ]
  },
  html: [
    './src/**/*.html',
    './lib/**/*.js',
    './Staticfile'
  ],
  fonts: [
    './node_modules/font-awesome/fonts/**/*',
    './node_modules/uswds/dist/fonts/**/*'
  ],
  images: [
    './node_modules/uswds/dist/img/**/*',
    './src/img/*'
  ],
  css: 'eqip.css',
  printCss: 'eqip.print.css',
  destination: {
    root: './dist',
    css: './dist/css',
    fonts: './dist/fonts',
    images: './dist/img'
  }
}

gulp.task('clean', clean)
gulp.task('copy', ['clean'], copy)
gulp.task('fonts', ['clean'], fonts)
gulp.task('images', ['clean'], images)
gulp.task('lint', [], sasslint(paths.sass.local[0], paths.sass.rules))
gulp.task('sass', ['clean'], convert)
gulp.task('build', ['clean', 'copy', 'fonts', 'images', 'sass'])
gulp.task('watchdog', ['build'], watchdog)
gulp.task('default', ['build'])

function clean () {
  'use strict'
  return del([
    paths.destination.root + '/*',
    // don't delete JS files created by Webpack
    '!' + paths.destination.root + '/eqip.js'
  ])
}

function copy () {
  'use strict'
  return gulp
    .src(paths.html)
    .pipe(gulp.dest(paths.destination.root))
}

function fonts () {
  'use strict'
  return gulp
    .src(paths.fonts)
    .pipe(gulp.dest(paths.destination.fonts))
}

function images () {
  'use strict'
  return gulp
    .src(paths.images)
    .pipe(gulp.dest(paths.destination.images))
}

function convert () {
  'use strict'
  return gulp
    .src(paths.sass.global.concat(paths.sass.local))
    .pipe(sass({
      includePaths: [ paths.sass.vars ]
    }))
    .pipe(concat(paths.css))
    .pipe(gulp.dest(paths.destination.css))
}

function watchdog () {
  'use strict'
  return gulp.watch([paths.sass.local], ['build'])
}
