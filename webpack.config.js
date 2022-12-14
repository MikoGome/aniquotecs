const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve('client', 'index.tsx'),
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: path.resolve('client', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g)$/,
        type: 'asset/inline'
      }
    ]
  },
  devServer: {
    static: path.resolve('build'),
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000'
    },
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }
}