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
        use: [
          'cache-loader',
          'babel-loader'
        ]
      }
    ]
  },
  devtool: debug ? 'cheap-module-source-map' : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    // expose within Docker
    host: '0.0.0.0',
    hot: true,
    port: 9000
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'API_BASE_URL', 'ALLOW_2FA_RESET', 'COOKIE_DOMAIN', 'HASH_ROUTING', 'DISABLE_2FA',
      'BASIC_ENABLED', 'SAML_ENABLED', 'SESSION_TIMEOUT',
      'ATTACHMENTS_ENABLED', 'FILE_MAXIMUM_SIZE', 'FILE_TYPES'
    ]),
    new webpack.HotModuleReplacementPlugin()
  ]
}
