const path = require('path');
module.exports = {
  entry: "./lib/flyYouFools.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map',
};
