var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel',
    },
    {
      test:/\.js$/,
      loader:"eslint-loader",
      exclude:"/node_modules/"
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'application.js'
  },
  devtool: 'eval',
  devServer: {
    contentBase: './public',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
