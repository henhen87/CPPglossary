
var path = require('path');

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.join(__dirname, "public"),

    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: /app/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  devtool: "eval-source-map"
};