'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var envifyReplace = require('loose-envify/replace');

var PLUGIN_NAME = 'gulp-envify';

function gulpEnvify(rootEnv) {
  var envs = [rootEnv || process.env];

  var stream = through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      file.contents = new Buffer(envifyReplace(file.contents.toString(), envs));
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);
    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
}

module.exports = gulpEnvify;
