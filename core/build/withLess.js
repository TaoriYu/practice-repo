const cssLoaderConfig = require('@zeit/next-css/css-loader-config');

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
        );
      }

      const { dev, isServer } = options;
      const {
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        lessLoaderOptions = {},
      } = nextConfig;

      options.defaultLoaders.less = cssLoaderConfig(config, {
        extensions: ['less', 'css'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions,
          },
        ],
      });

      if (process.env.NODE_ENV !== 'production') {
        options.defaultLoaders.less = options.defaultLoaders.less.filter((l) => {
          return l.loader !== 'postcss-loader';
        });
      }

      config.module.rules.push({
        test: /\.(less|css)$/,
        exclude: [/\.critical\.(less|css)$/],
        use: options.defaultLoaders.less
      });

      config.module.rules.push({
        test: /\.critical\.less$/,
        use: [
          { loader: 'to-string-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'less-loader' },
        ].filter(Boolean),
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
