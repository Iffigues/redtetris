const path = require('path');

module.exports = {
  entry: {
    app: './src/client/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [["@babel/env"], "@babel/react"],
              plugins: ["react-hot-loader/babel"]
          }
        }]
      }
    ]
  }
};
