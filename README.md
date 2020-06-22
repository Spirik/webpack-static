Webpack-based static site
=========================

Template for creation of static multi-page HTML site using Webpack.

Why would you want to use it? It depends. In majority of cases, chances are you shouldn't. In other possible scenario - it may help you to jump-start development of initial static markup for a site that will most-likely use this stack later on and do some quick prototyping.

This is a fork of [Harris](https://github.com/Harrix) / [static-site-webpack-habr](https://github.com/Harrix/static-site-webpack-habr), tweaked and tuned a little for my liking.

Installation
------------

To install & build run:
* `yarn install` (to install packages)
* `yarn dev` (to build sources into `dist` directory in development mode, w/o minification)
* `yarn build` (to build sources into `dist` directory in production mode, with minification)
* `yarn watch` (to dynamically rebuild site in development mode each time files are changed)
* `yarn start` (to launch Webpack Dev Server on port 8080 with hot-reload)

Notes on implementation
-----------------------

* HTML partials support lodash/underscore templates; it is possible to pass variables to partial;
* `fonts` and `img` directories are copied directly into `dist` directory using `copy-webpack-plugin`;
* Currently `url` option of `css-loader` is set to `false`. This prohibits url found in CSS to be resolved automatically. This is done to mitigate a possible issue with assets of 3-rd party libraries installed as a node modules and included in CSS manifest with `@import` statement. Possible solution is to use [`resolve-url-loader`](https://github.com/bholloway/resolve-url-loader) and `file-loader`.

Differences
-----------

Main differences from the [original](https://github.com/Harrix/static-site-webpack-habr) version:

* `.nvmrc` file for node version selection via NVM added;
* `autoprefixer` added;
* `browserslist` config for `babel` and `autoprefixer` specified in `package.json`;
* `dist` directory added to `.gitignore`;
* `del-cli` replaced with `clean-webpack-plugin` for `dist` cleaning;
* `inject` set to `true` for `HtmlWebpackPlugin`;
* PostCSS used instead of SCSS (`postcss.config.js` added);
* `html/views` directory removed (html views now reside in `html` directory directly), `includes` folder renamed to `common`;
* `ProvidePlugin` used to load jQuery;
* `svg-sprite-loader` and `svgo-loader` added to generate SVG sprites.
