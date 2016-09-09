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
  plugins: [
    new ManifestPlugin('path/to/manifest.json'),
  ],
};
```
