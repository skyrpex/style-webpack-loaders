# Style Webpack loaders

## Installation

`npm install @skyrpex/style-webpack-loaders`

## Usage

```js
// webpack.config.js
import {
  ExtractTextPlugin,
  loaders,
  vueLoaders,
} from '@skyrpex/style-webpack-loaders';

export default {
  // ...
  module: {
    loaders: {
      ...loaders(/* { sourceMap: true, extract: true } */),
    },
  },
  vue: {
    loaders: {
      ...vueLoaders(/* { sourceMap: true, extract: true } */),
    },
  },
  plugins: [
    // Extract styles to a file
    new ExtractTextPlugin('css/[name].[contenthash].css'),
  ],
};
```
