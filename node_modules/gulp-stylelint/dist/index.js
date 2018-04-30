'use strict';

var _stylelint = require('stylelint');

var _gulpUtil = require('gulp-util');

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _deepExtend = require('deep-extend');

var _deepExtend2 = _interopRequireDefault(_deepExtend);

var _formatters = require('stylelint/dist/formatters');

var formatters = _interopRequireWildcard(_formatters);

var _reporterFactory = require('./reporter-factory');

var _reporterFactory2 = _interopRequireDefault(_reporterFactory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Name of this plugin for reporting purposes.
 * @type {String}
 */
var pluginName = 'gulp-stylelint';

/**
 * Stylelint results processor.
 * @param {Object} [options] - Plugin options.
 * @param {String} [options.reportOutputDir] - Common path for all reporters.
 * @param {[Object]} [options.reporters] - Reporter configurations.
 * @param {Boolean} [options.debug] - If true, error stack will be printed.
 * @return {Stream} Object stream usable in Gulp pipes.
 */
/**
 * Gulp stylelint plugin.
 * @module gulp-stylelint
 */

module.exports = function gulpStylelint(options) {

  /**
   * Plugin options with defaults applied.
   * @type Object
   */
  var pluginOptions = (0, _deepExtend2.default)({
    failAfterError: true,
    debug: false
  }, options);

  /**
   * Lint options for stylelint's `lint` function.
   * @type Object
   */
  var lintOptions = (0, _deepExtend2.default)({}, options);

  /**
   * List of gulp-stylelint reporters.
   * @type [Function]
   */
  var reporters = (pluginOptions.reporters || []).map(function (config) {
    return (0, _reporterFactory2.default)(config, pluginOptions);
  });

  /**
   * List of stylelint's lint result promises.
   * @type [Promise]
   */
  var lintPromiseList = [];

  // Remove the stylelint options that cannot be used:
  delete lintOptions.files; // css code will be provided by gulp instead
  delete lintOptions.formatter; // formatters are defined in the `reporters` option

  // Remove gulp-stylelint options so that they don't interfere with stylelint options:
  delete lintOptions.reportOutputDir;
  delete lintOptions.reporters;
  delete lintOptions.debug;

  /**
   * Launches linting of a given file, pushes promises to the promise list.
   *
   * Note that the files are not modified and are pushed
   * back to their pipes to allow usage of other plugins.
   *
   * @param {File} file - Piped file.
   * @param {String} encoding - File encoding.
   * @param {Function} done - File pipe completion callback.
   * @return {undefined} Nothing is returned (done callback is used instead).
   */
  function onFile(file, encoding, done) {

    if (file.isNull()) {
      done(null, file);
      return;
    }

    if (file.isStream()) {
      this.emit('error', new _gulpUtil.PluginError(pluginName, 'Streaming is not supported'));
      done();
      return;
    }

    var localLintOptions = (0, _deepExtend2.default)({}, lintOptions, {
      code: file.contents.toString(),
      codeFilename: file.path
    });

    lintPromiseList.push((0, _stylelint.lint)(localLintOptions));

    done(null, file);
  }

  /**
   * Provides Stylelint result to reporters.
   * @param {[Object]} lintResults - Stylelint results.
   * @return {Promise} Resolved with original lint results.
   */
  function passLintResultsThroughReporters(lintResults) {
    var warnings = lintResults.reduce(function (accumulated, res) {
      return accumulated.concat(res.results);
    }, []);
    return _promise2.default.all(reporters.map(function (reporter) {
      return reporter(warnings);
    })).then(function () {
      return lintResults;
    });
  }

  /**
   * Resolves promises and provides accumulated report to reporters.
   * @param {Function} done - Stream completion callback.
   * @return {undefined} Nothing is returned (done callback is used instead).
   */
  function onStreamEnd(done) {
    var _this = this;

    _promise2.default.all(lintPromiseList).then(passLintResultsThroughReporters).then(function (lintResults) {
      process.nextTick(function () {
        if (pluginOptions.failAfterError && lintResults.some(function (result) {
          return result.errored;
        })) {
          var errorMessage = 'Errors were found while linting code.';
          _this.emit('error', new _gulpUtil.PluginError(pluginName, errorMessage));
        }
        done();
      });
    }).catch(function (error) {
      process.nextTick(function () {
        _this.emit('error', new _gulpUtil.PluginError(pluginName, error, {
          showStack: !!pluginOptions.debug
        }));
        done();
      });
    });
  }

  return _through2.default.obj(onFile, onStreamEnd);
};

/**
 * Formatters bundled with stylelint by default.
 *
 * User may want to see the list of available formatters,
 * proxy them or pass them as functions instead of strings.
 *
 * @see https://github.com/olegskl/gulp-stylelint/issues/3#issuecomment-197025044
 * @type {Object}
 */
module.exports.formatters = formatters;