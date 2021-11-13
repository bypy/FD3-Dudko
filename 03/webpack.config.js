const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('./node_modules/terser-webpack-plugin'); // comes with webpack 5
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const servePage = 'index.html';

module.exports = {
  entry: './src/App.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist', 'public'),
    clean: true,
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      publicPath: path.join(__dirname, 'dist'),
      serveIndex: true,
    },
    watchFiles: ['./*.js', './*.json', 'src/**/*', 'public/*'],
    client: {
      progress: true,
    },
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
    minimize: false,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: `${servePage}`,
      template: './public/index.html',
      favicon: './public/images/favicon.ico',
    }),
  ],
};
