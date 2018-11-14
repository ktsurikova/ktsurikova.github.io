// Для использования нужен Node.JS
// Поставьте webpack:
//   npm i -g webpack
// Поставьте babel-loader:
//   npm i babel-loader
// Запустите его в директории с файлами:
//   webpack

module.exports = {
  entry: './scripts/app',

  output: {
    filename: './bundle.js'
  },

  mode: 'development',

  module: {
      rules: [
        {
          //test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              //presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
};
