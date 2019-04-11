const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
// Hot reload without eject
// docs on: https://github.com/cdharris/react-app-rewire-hot-loader
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = function override(config, env) {
  config.resolve = {
    extensions: ['.js', '.jsx', '.scss'],
    plugins: [ new DirectoryNamedWebpackPlugin() ],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      icons: path.resolve(__dirname, 'src/assets/icons'),
      styles: path.resolve(__dirname, 'src/styles'),
      router: path.resolve(__dirname, 'src/router'),
      selectors: path.resolve(__dirname, 'src/selectors'),
      utils: path.resolve(__dirname, 'src/utils'),
      redux_modules: path.resolve(__dirname, 'src/redux-modules'),
      reducerRegistry: path.resolve(__dirname, 'src/reducerRegistry')
    }
  }
  config = rewireReactHotLoader(config, env);
  return config;
}