var production = process.env.NODE_ENV === 'production'
var staging = process.env.NODE_ENV === 'staging'
var debug = !production && !staging
var webpack = require('webpack')
var pack = require('path')

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
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
}
