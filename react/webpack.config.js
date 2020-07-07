var path = require('path');

module.exports = {
  entry: './src/client/index.js',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      rules: 'babel',
      query:{
        presets: ["es2017", "react", "stage-0"]
      }
    }]
  }
};
