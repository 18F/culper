var del = require('del')
var gulp = require('gulp')
var sasslint = require('@18f/stylelint-rules')
require('dotenv').config()

var paths = {
  sass: {
    rules: {
      config: '../../../stylelint.config.js'
    },
    local: './src/**/*.s+(a|c)ss'
  },
  js: ['./lib/**/*.js'],
  misc: ['./Staticfile'],
  fonts: [
    './node_modules/font-awesome/fonts/**/*',
    './node_modules/uswds/dist/fonts/**/*'
  ],
  images: ['./node_modules/uswds/dist/img/**/*', './src/img/*'],
  destination: {
    root: './dist',
    fonts: './dist/fonts',
    images: './dist/img'
  }
}

gulp.task('clean', clean)
gulp.task('js', js)
gulp.task('misc', misc)
gulp.task('fonts', fonts)
gulp.task('images', images)
gulp.task('lint', sasslint(paths.sass.local, paths.sass.rules))
gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('js', 'misc', 'fonts', 'images'))
)
gulp.task('default', gulp.series('build'))

function clean() {
  'use strict'
  return del([
    paths.destination.root + '/*',
    // don't delete JS files created by Webpack
    '!' + paths.destination.root + '/js',
    '!' + paths.destination.root + '/css'
  ])
}

function js() {
  'use strict'
  return gulp.src(paths.js).pipe(gulp.dest(paths.destination.root))
}

function misc() {
  'use strict'
  return gulp.src(paths.misc).pipe(gulp.dest(paths.destination.root))
}

function fonts() {
  'use strict'
  return gulp.src(paths.fonts).pipe(gulp.dest(paths.destination.fonts))
}

function images() {
  'use strict'
  return gulp.src(paths.images).pipe(gulp.dest(paths.destination.images))
}
