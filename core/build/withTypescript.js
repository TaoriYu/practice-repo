const isProd = process.env.NODE_ENV === 'production';

module.exports = (nextConfig = {}) => {
  if (!nextConfig.pageExtensions) {
    nextConfig.pageExtensions = ['jsx', 'js'];
  }

  if (nextConfig.pageExtensions.indexOf('ts') === -1) {
    nextConfig.pageExtensions.unshift('ts');
  }

  if (nextConfig.pageExtensions.indexOf('tsx') === -1) {
    nextConfig.pageExtensions.unshift('tsx');
  }

  if (nextConfig.typescriptLoaderOptions) {
    throw new Error(
      '`typescriptLoaderOptions` in next.config.js is no longer supported.' +
      ' https://err.sh/next-plugins/typescript-loader-options',
    );
  }

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const path = require('path');

      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0' +
          ' https://err.sh/next-plugins/upgrade',
        );
      }

      const { dir, defaultLoaders, dev, isServer } = options;

      config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');

      // Backwards compatibility with older versions of Next.js.
      // Next.js will automatically apply hot-self-accept-loader for all extensions in `pageExtensions`
      // Which next-typescript adds itself to
      if (!defaultLoaders.hotSelfAccept) {
        if (dev && !isServer) {
          config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: 'hot-self-accept-loader',
            include: [path.join(dir, 'pages')],
            options: {
              extensions: /\.(ts|tsx)$/,
            },
          });
        }
      }
      config.module.rules.push({
        test: /\.(tsx?|jsx?)$/,
        include: [dir],
        exclude: isProd ? undefined : /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            happyPackMode: true,
          },
        }],
      });
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
