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
          test: /\.scss$/,
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
