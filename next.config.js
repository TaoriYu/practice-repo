const withTypescript = require('./core/build/withTypescript');
const withLESS = require('./core/build/withLess');
const withTemplate = require('./core/build/withTemplate');
const { compose } = require('ramda');

module.exports = () => {
  const conf =  compose(
    withTypescript,
    withLESS,
    makeCssConfig,
    withTemplate,
    /** add your custom settings HERE */
  )();

  return conf;
};

function makeCssConfig(nextConfig) {
  return {
    cssModules: 'global', // enabling modules in global scope
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[name]_[local]__[hash:base64:5]',
    },
    ...nextConfig,
  };
}
