const production = process.env.NODE_ENV === 'production'
const staging = process.env.NODE_ENV === 'staging'
const debug = !production && !staging
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './src/boot.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'eqip.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          function (absPath) {
            let re = /\.(production|staging|development)\./
            return re.exec(absPath) === null
          }
        ],
        exclude: [
          /(node_modules|bower_components)/
        ],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread']
        }
      }
    ]
  },
  devtool: debug ? 'inline-sourcemap' : false,
  plugins: plugins()
}

/**
 * Creates an array of plugins to be used by all environments
 */
function plugins () {
  let plugins = []

  if (!debug) {
    // Add Prod level plugins
    plugins = [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
  }

  // Plugins used by all environments
  [
    new webpack.EnvironmentPlugin([
      'API_BASE_URL', 'ALLOW_2FA_RESET', 'HASH_ROUTING', 'DISABLE_2FA',
      'BASIC_ENABLED', 'SAML_ENABLED', 'SESSION_TIMEOUT'
    ]),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ].forEach((p) => {
    plugins.push(p)
  })

  return plugins
}
