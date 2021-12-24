const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('./node_modules/terser-webpack-plugin'); // comes with webpack 5
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const htmlTemplate = 'mobile-template.html';

module.exports = {
  entry: ['babel-polyfill', './src/App.js'],
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].bundle.[fullhash].min.js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'static'),
      },
    ],
    compress: false,
    port: 9000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpg|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'production' ? 'styles.[fullhash].min.css' : 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: `./src/${htmlTemplate}`,
      inject: 'body',
      favicon: './static/favicon.ico',
    }),
  ],
};
