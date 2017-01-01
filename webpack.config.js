let production = process.env.NODE_ENV === 'production'
let staging = process.env.NODE_ENV === 'staging'
let debug = !production && !staging
let webpack = require('webpack')

module.exports = {
  devtool: debug ? 'inline-sourcemap' : null,
  resolve: {
    extensions: ['', '.js', '.jsx']
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
  output: {
    filename: 'eqip.js'
  },
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
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
  }

  // Plugins used by all environments
  plugins.push(new webpack.EnvironmentPlugin([
    'API_BASE_URL'
  ]))

  return plugins
}
