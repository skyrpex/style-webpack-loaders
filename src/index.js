import each from 'lodash.foreach';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export { ExtractTextPlugin };

export const vueLoaders = (options = {}) => {
  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    const sourceLoader = loaders.map(loader => {
      let extraParamChar;
      if (/\?/.test(loader)) {
        // eslint-disable-next-line
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        // eslint-disable-next-line
        loader = loader + '-loader';
        extraParamChar = '?';
      }
      return loader + (options.sourceMap ? `${extraParamChar}sourceMap` : '');
    }).join('!');

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
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
    styl: generateLoaders(['css', 'stylus']),
  };
};

// Generate loaders for standalone style files (outside of .vue)
export const loaders = options => {
  const output = [];
  each(vueLoaders(options), (loader, extension) => {
    output.push({
      test: new RegExp(`\\.${extension}$`),
      loader,
    });
  });
  return output;
};
