const path = require('path');
const fs = require('fs');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir), {withFileTypes: true});
  return templateFiles.filter(item => {
    return (item.isFile() && /\.html$/.test(item.name));
  })
    .map(item => {
      const parts = item.name.split('.');
      const name = parts[0];
      const extension = parts[1];
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: true,
      })
    })
}

const htmlPlugins = generateHtmlPlugins('./src/html');

module.exports = (env, options) => {
  const prodMode = options.mode === 'production';
  return {
    entry: {
      app: ['./src/js/app.js', './src/css/app.css'],
      svg: './src/js/svg.js'
    },
    output: {
      filename: './js/[name]-[hash].js'
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src/js'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  modules: false
                }],
              ],
              plugins: ['@babel/plugin-proposal-class-properties'],
            }
          }
        },
        {
          test: /\.(css|sass|scss)$/,
          include: path.resolve(__dirname, 'src/css'),
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false
              }
            },
            'postcss-loader',
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(svg)$/i,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'svg-[name]',
                extract: false,
                spriteFilename: 'sprite.svg'
              }
            },
            {
              loader: 'svgo-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, 'src/html/common'),
          use: {
            loader: 'html-loader',
            options: {
              attrs: false, // Do not resolve src attrs, https://webpack.js.org/loaders/html-loader/#usage
              minimize: prodMode,
              removeComments: prodMode,
              collapseWhitespace: prodMode
            }
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new MiniCssExtractPlugin({
        filename: "./css/app-[hash].css"
      }),
      new CopyWebpackPlugin([
        {
          from: './src/img',
          to: './img'
        },
        {
          from: './src/fonts',
          to: './fonts'
        },
        {
          from: './src/favicon.ico',
          to: './favicon.ico'
        }
      ]),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
    ].concat(htmlPlugins)
  }
};
