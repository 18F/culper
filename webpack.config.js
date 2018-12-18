const production = process.env.NODE_ENV === 'production'
const staging = process.env.NODE_ENV === 'staging'
const debug = !production && !staging
const webpack = require('webpack')
const path = require('path')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

module.exports = {
  mode: production ? 'production' : 'development',
  entry: {
    polyfills: './src/polyfills.js',
    eqip: './src/boot.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: ['cache-loader', 'babel-loader']
      }
    ]
  },
  devtool: debug ? 'cheap-module-source-map' : 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin([
      'API_BASE_URL',
      'COOKIE_DOMAIN',
      'HASH_ROUTING',
      'BASIC_ENABLED',
      'SAML_ENABLED',
      'SAML_SLO_ENABLED',
      'SESSION_TIMEOUT',
      'ATTACHMENTS_ENABLED',
      'FILE_MAXIMUM_SIZE',
      'FILE_TYPES'
    ]),
    new webpack.DefinePlugin({
      EAPP_VERSION: JSON.stringify(
        new GitRevisionPlugin({
          versionCommand: 'describe --tags --always'
        }).version()
      )
    })
  ]
}
