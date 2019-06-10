const webpack = require('webpack')
const path = require('path');
const GitRevisionPlugin = require('git-revision-webpack-plugin')

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      modules: [
        ...config.resolve.modules,
        path.resolve(__dirname, '../dist'),
      ],
    },
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.module\.scss$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            { loader: 'sass-loader' },
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
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        EAPP_VERSION: JSON.stringify(
          new GitRevisionPlugin({
            versionCommand: 'describe --tags --always'
          }).version()
        )
      })
    ]
  };
};
