var webpack = require('webpack-stream')
var del = require('del')
var gulp = require('gulp')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var envify = require('gulp-envify')

require('dotenv').config()

var paths = {
  entry: './src/boot.jsx',
  js: [
    './src/**/*.js*'
  ],
  sass: [
    './node_modules/font-awesome/**/*.scss',
    './node_modules/uswds/src/stylesheets/**/*.scss',
    './src/**/*.scss'
  ],
  html: ['./src/**/*.html'],
  fonts: [
    './node_modules/font-awesome/fonts/**/*',
    './node_modules/uswds/dist/fonts/**/*'
  ],
  images: [
    './node_modules/uswds/dist/img/**/*'
  ],
  css: 'eqip.css',
  destination: {
    root: './dist',
    css: './dist/css',
    fonts: './dist/fonts',
    images: './dist/img'
  },
  webpack: './webpack.config.js'
}

gulp.task('setup', setup)
gulp.task('clean', clean)
gulp.task('copy', ['clean'], copy)
gulp.task('fonts', ['clean'], fonts)
gulp.task('images', ['clean'], images)
gulp.task('sass', convert)
gulp.task('build', ['setup', 'clean', 'copy', 'fonts', 'images', 'sass'], compile)
gulp.task('watchdog', ['build'], watchdog)
gulp.task('default', ['build'])

function setup () {
  'use strict'
  switch (process.env.NODE_ENV) {
    case 'production':
      return gulp
        .src('./src/config/environment.production.js')
        .pipe(rename('./src/config/environment.js'))
        .pipe(gulp.dest('.', { overwrite: true }))

    case 'staging':
      return gulp
        .src('./src/config/environment.staging.js')
        .pipe(rename('./src/config/environment.js'))
        .pipe(gulp.dest('.', { overwrite: true }))

    default:
      return gulp
        .src('./src/config/environment.dev.js')
        .pipe(envify(process.env))
        .pipe(rename('./src/config/environment.js'))
        .pipe(gulp.dest('.', { overwrite: true }))
  }
}

function clean () {
  'use strict'
  return del([
    paths.destination.css + '/*',
    paths.destination.images + '/*',
    paths.destination.fonts + '/*',
    paths.destination.root + '/*'
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

function compile () {
  'use strict'
  return gulp
    .src(paths.entry)
    .pipe(webpack(require(paths.webpack)))
    .pipe(gulp.dest(paths.destination.root))
}

function convert () {
  'use strict'
  return gulp
    .src(paths.sass)
    .pipe(sass())
    .pipe(concat(paths.css))
    .pipe(gulp.dest(paths.destination.css))
}

function watchdog () {
  'use strict'
  return gulp.watch([paths.js, paths.sass], ['build'])
}
