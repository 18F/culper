const production = process.env.NODE_ENV === 'production'
const staging = process.env.NODE_ENV === 'staging'
const debug = !production && !staging
const webpack = require('webpack')
const path = require('path')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: production ? 'production' : 'development',
  entry: {
    polyfills: './src/polyfills.js',
    eqip: './src/boot.jsx',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist', 'js'),
    publicPath: '/js/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: ['cache-loader', 'babel-loader'],
      },
      {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, 'src', 'sass')],
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './node_modules/uswds/src/stylesheets/lib/addons/_font-stacks.scss',
                './node_modules/uswds/src/stylesheets/core/_variables.scss',
                './src/sass/_eqip-colors.scss',
                './src/sass/_eqip-fonts.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false, sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, 'src', 'sass')],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
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
      'FILE_TYPES',
    ]),
    new webpack.DefinePlugin({
      EAPP_VERSION: JSON.stringify(
        new GitRevisionPlugin({
          versionCommand: 'describe --tags --always',
        }).version()
      ),
    }),
    new CleanWebpackPlugin(['dist/js', 'dist/css']),
    new MiniCssExtractPlugin({
      filename: '../css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
    }),
  ],
}
