const path = require('path');

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-storysource',
  ],

  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [require.resolve('@emotion/babel-plugin')],
          },
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.modules.push(
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': toPath('node_modules/@emotion/react'),
      '@emotion/styled': toPath('node_modules/@emotion/styled'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    };

    return config;
  },
};
