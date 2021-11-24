module.exports = {
  entry: './App.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: __dirname,
    },
    compress: false,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
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
};
