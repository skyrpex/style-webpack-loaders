'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loaders = exports.vueLoaders = exports.ExtractTextPlugin = undefined;

var _lodash = require('lodash.foreach');

var _lodash2 = _interopRequireDefault(_lodash);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ExtractTextPlugin = _extractTextWebpackPlugin2.default;
var vueLoaders = exports.vueLoaders = function vueLoaders() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar = void 0;
      if (/\?/.test(loader)) {
        // eslint-disable-next-line
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        // eslint-disable-next-line
        loader = loader + '-loader';
        extraParamChar = '?';
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
    }).join('!');

    if (options.extract) {
      return _extractTextWebpackPlugin2.default.extract({
        fallbackLoader: 'vue-style-loader',
        loader: sourceLoader
      });
    }

    return ['vue-style-loader', sourceLoader].join('!');
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'resolve-url', 'sass?indentedSyntax&sourceMap']),
    scss: generateLoaders(['css', 'resolve-url', 'sass?sourceMap']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  };
};

// Generate loaders for standalone style files (outside of .vue)
var loaders = exports.loaders = function loaders(options) {
  var output = [];
  (0, _lodash2.default)(vueLoaders(options), function (loader, extension) {
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    });
  });
  return output;
};