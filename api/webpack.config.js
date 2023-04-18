const path = require('path')
const webpack = require('webpack')
const NodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'eval',
  mode: process.env.NODE_ENV,
  target: 'node',
  externals: [NodeExternals()],
  entry: ['./src/index.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    mainFields: ['main', 'module'],
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
}
