// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
function resolve() {
  return path.resolve.apply(path, [__dirname, '..'].concat(...arguments))
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: resolve('./dist/index.html'),
    assetsRoot: resolve('./dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    // only build nw
    onlyNW: process.env.npm_config_onlyNW,
    // only build nw
    noSetup: process.env.npm_config_noSetup,
    nw: {
      // manifest for nw
      // the fileds will merge with `./package.json` and build to `./dist/package.json` for NW.js
      // Manifest Format: http://docs.nwjs.io/en/latest/References/Manifest%20Format/
      manifest: ['name', 'appName', 'version', 'description', 'author', { main: './index.html' }, 'window', 'nodejs', 'js-flags', 'node-remote'],
      // see document: https://github.com/nwjs/nw-builder
      builder: {
        files: [resolve('./dist/**')],
        platforms: ['win32', 'win64'],
        flavor: 'normal',
        cacheDir: resolve('./node_modules/_nw-builder-cache/'),
        buildDir: resolve('./output'),
        zip: true,
        buildType: 'versioned'
      }
    }
  },
  dev: {
    env: require('./dev.env'),
    port: 8083,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: 'http://localhost:8083/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
