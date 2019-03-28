const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, args) => {
  const isProduction = !args.mode || args.mode === 'production';

  return {
    entry: './src/js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
      })],
    devServer: {
      https: false,
      before: function(app, server) {
        app.get('/', function(req, res) {
          res.json({ custom: 'response' });
        });
      }
    }
  }

}
