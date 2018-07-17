const path = require('path');
const webpack = require('webpack');

const resolve = location => path.resolve(__dirname, location);

module.exports = {

  devServer: {
    hot: true,
    port: 8080,
    host: '0.0.0.0',
    public: 'localhost',
    contentBase: './build',
    index: './src/index.html'
  },

  entry: {
    index: path.resolve(__dirname, './src/index.js')
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
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
      resolve('./node_modules')
    ],
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
