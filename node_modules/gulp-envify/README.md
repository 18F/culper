# gulp-envify

> Gulp plugin for envify without browserify

## Installation

```
npm install --save-dev gulp-envify
```

## Usage

```javascript
var envify = require('gulp-envify');

gulp.task('compress', function() {
  return gulp.src('lib/*.js')
    .pipe(envify([environment]))
    .pipe(gulp.dest('dist'));
});
```
