module.exports = function override(config, env) {
  //do stuff with the webpack config...
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


  config = {optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          }
        }
      })
    ]
  }}
  return config;
}