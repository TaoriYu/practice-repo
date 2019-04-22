const { DefinePlugin, NormalModuleReplacementPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const STATES = {
  production: process.env.NODE_ENV === 'production',
  dev: process.env.NODE_ENV !== 'production',
  analyze: Boolean(process.env.NODE_ANALYZE),
  analyzeStatic: process.env.NODE_ANALYZE === 'static',
};

module.exports = function withTemplate(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (options.isServer) {
        serverSide(config, options);
      } else {
        clientSide(config, options);
      }
      bothSides(config, options);

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

function serverSide(config, options) {
  const addPlugin = (plugin) => config.plugins = config.plugins.concat(plugin);
  const originalEntry = config.entry;
  config.entry = async () => {
    const entries = await originalEntry();
    for ( const entryKey in entries) {
      if (
        entries.hasOwnProperty(entryKey) &&
        entries[entryKey] &&
        !entries[entryKey].includes('./polyfills.js')
      ) {
        entries[entryKey].unshift('./polyfills.js');
      }
    }

    return entries;
  };

  if (STATES.production) {
    addPlugin(new ForkTsCheckerWebpackPlugin());
  }
  addPlugin([
    [/next\/asset/, 'next-server/asset'],
    [/next\/dynamic/, 'next-server/dynamic'],
    [/next\/constants/, 'next-server/constants'],
    [/next\/config/, 'next-server/config'],
    [/next\/head/, 'next-server/head'],
  ].map(args => new NormalModuleReplacementPlugin(...args)));
}

function clientSide(config, options) {
  const addPlugin = (plugin) => config.plugins = config.plugins.concat(plugin);
  const originalEntry = config.entry;
  config.entry = async () => {
    const entries = await originalEntry();
    if (
      entries['main.js'] &&
      !entries['main.js'].includes('./polyfills.js')
    ) {
      entries['main.js'].unshift('./polyfills.js');
    }

    return entries;
  };

  if (STATES.analyze) {
    addPlugin(new BundleAnalyzerPlugin({
      analyzerMode: STATES.analyzeStatic ? 'static' : 'server',
      defaultSizes: 'gzip',
      openAnalyzer: !STATES.analyzeStatic,
      reportFilename: STATES.analyzeStatic ? '../bundle-report.html' : undefined,
    }));
  }
}

function bothSides(config, options) {
  const addPlugin = (plugin) => config.plugins = config.plugins.concat(plugin);

  addPlugin(new DefinePlugin({ 'process.env.IS_SERVER': options.isServer }));
  if (STATES.production) {
    addPlugin(new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('clean-css'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }));
  }
}
