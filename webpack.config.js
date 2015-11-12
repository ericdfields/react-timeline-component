var webpack = require('webpack')

module.exports = {
  entry: ['./app/main.js'],
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /(node_modules)/, 
        loaders: ['react-hot', 'babel?optional[]=runtime&stage=0'] 
      },
      {
        test: /\.css$/,
        loaders: ['style','css']
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ]
};