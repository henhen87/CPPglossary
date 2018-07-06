var path      = require('path');
const fs      = require('fs');
const appRoot = fs.realpathSync(process.cwd());
const appModules = path.resolve(appRoot, 'node_modules')

console.log('APP ROOT', appRoot);

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.join(__dirname, "public/js"),
    filename: "index.js"
  },
  resolve: {
    modules: [appModules, path.resolve(appRoot, 'app')], //lets you start your application from specified path. Can also use resolve.alias
    extensions: ['.js'] //lets you leave out file extension when importing. E.g import someFile from 'somefile.js' => import someFile from 'somefile' 
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: /app/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"],
          plugins: ['transform-object-rest-spread', 'transform-class-properties']
        }
      }
    ]
  },
  devtool: "eval-source-map"
};