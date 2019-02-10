const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants'); // Get values from `next-server` package when building on now v

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }

  const withTypescript = require('./core/build/withTypescript');
  const withCSS = require('@zeit/next-css');

  return withTypescript(withCSS(Object.assign({}, makeCssConfig(), customs())));
};

function makeCssConfig() {
  return {
    cssModules: 'global', // enabling modules in global scope
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[name]_[local]__[hash:base64:5]",
    },
  }
}

function customs() {
  const webpack = require('webpack');
  const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  return {
    webpack: (config, options) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty',
        path: 'empty'
      };
      if (options.isServer) {
        if (process.env.NODE_ENV !== 'production') {
          config.plugins.push(new ForkTsCheckerWebpackPlugin());
        }
        config.plugins = config.plugins.concat([
          [/next\/asset/, 'next-server/asset'],
          [/next\/dynamic/, 'next-server/dynamic'],
          [/next\/constants/, 'next-server/constants'],
          [/next\/config/, 'next-server/config'],
          [/next\/head/, 'next-server/head'],
        ].map(args => new webpack.NormalModuleReplacementPlugin(...args)));
      }
      config.plugins.push(
        new webpack.DefinePlugin({ 'process.env.IS_SERVER': options.isServer })
      );
      if (!options.isServer) {
        if (process.env.NODE_ANALYZE) {
          config.plugins.push(new BundleAnalyzerPlugin());
        }
      }
      return config
    },

  };
}
