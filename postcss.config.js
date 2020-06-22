const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPrependImports = require('postcss-prepend-imports');
const postcssImport = require('postcss-import');
const postcssCustomMedia = require('postcss-custom-media');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssNested = require('postcss-nested');
const postcssCustomSelectors = require('postcss-custom-selectors');
const postcssPresetEnv = require('postcss-preset-env');
const path = require('path');

// ENV
const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';

module.exports = {
  plugins: [
    postcssPresetEnv({ stage: 4 }),
    postcssPrependImports({
      path: path.join(__dirname, '/src/css/common'),
      files: ['selectors.css', 'media.css']
    }),
    postcssImport(),
    postcssNested(),
    postcssCustomMedia(),
    postcssCustomProperties({
      importFrom: path.join(__dirname, '/src/css/common/variables.css'),
      preserve: true
    }),
    postcssCustomSelectors(),
    autoprefixer(),
  ].concat(DEV ? [] : cssnano({
    preset: ['default', {
      discardComments: {
        removeAll: true,
      },
    }]
  })),
};
