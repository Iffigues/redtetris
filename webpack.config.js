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
        use: [
          'react-hot-loader/webpack',
          {
          loader: 'babel-loader',
          options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [["@babel/env"], "@babel/react"],
              plugins: ["@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties", "transform-class-properties", "react-hot-loader/babel", ["module-resolver", {"root": ["./src/client"]}]]
          }
        }]
      }
    ]
  }
};
