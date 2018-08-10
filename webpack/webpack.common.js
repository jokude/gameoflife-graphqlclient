const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = location => path.resolve(__dirname, location);

module.exports = {

  devServer: {
    hot: true,
    port: 8080,
    host: '0.0.0.0',
    public: 'localhost',
    contentBase: './build',
    index: '../src/index.html'
  },

  target: 'web',

  entry: {
    index: resolve('../src/index.js')
  },

  output: {
    path: resolve('../build'),
    filename: 'bundle.js'
  },

  node: {
    console: false,
    process: false,
    setImmediate: false,
    __filename: false
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },

  resolve: {
    modules: [
      resolve('../node_modules')
    ],
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      title: 'Game of Life - Grapqhl',
      template: resolve('../src/layout/index.html')
    })
  ]
};
