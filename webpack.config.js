const production = process.env.NODE_ENV === 'production'
const staging = process.env.NODE_ENV === 'staging'
const debug = !production && !staging
const webpack = require('webpack')
const path = require('path')

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
        loader: 'babel-loader'
      }
    ]
  },
  devtool: debug ? 'cheap-module-source-map' : false,
  plugins: [
    new webpack.EnvironmentPlugin([
      'API_BASE_URL', 'ALLOW_2FA_RESET', 'HASH_ROUTING', 'DISABLE_2FA',
      'BASIC_ENABLED', 'SAML_ENABLED', 'SESSION_TIMEOUT',
      'ATTACHMENTS_ENABLED', 'FILE_MAXIMUM_SIZE', 'FILE_TYPES'
    ]),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
}
