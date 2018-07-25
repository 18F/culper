const production = process.env.NODE_ENV === 'production'
const staging = process.env.NODE_ENV === 'staging'
const debug = !production && !staging
const webpack = require('webpack')
const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  mode: production ? 'production' : 'development',
  entry: ['babel-polyfill', './src/boot.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'eqip.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'cache-loader',
          'babel-loader'
        ]
      }
    ]
  },
  devtool: debug ? 'cheap-module-source-map' : 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin([
      'API_BASE_URL', 'COOKIE_DOMAIN', 'HASH_ROUTING',
      'BASIC_ENABLED', 'SAML_ENABLED', 'SESSION_TIMEOUT',
      'ATTACHMENTS_ENABLED', 'FILE_MAXIMUM_SIZE', 'FILE_TYPES'
    ]),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ]
}
