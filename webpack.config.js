/*

node modules to install:

npm i -D css-loader
npm i -D file-loader
npm i -D html-loader
npm i -D html-webpack-inline-source-plugin
npm i -D html-webpack-plugin
npm i -D jquery
npm i -D node-sass
npm i -D sass-loader
npm i -D style-loader
npm i -D webpack
npm i -D webpack-cli
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist02'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {loader:'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader:'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html', 
      inlineSource: 'bundle.js'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.ProvidePlugin(
      {
        $ : 'jquery',
        jQuery: 'jquery'
      }
    )
  ]
};
