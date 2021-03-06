const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            src: './src'
          }
        }
      ],
      'react-native-paper/babel',
      'react-native-reanimated/plugin'
    ]
  };
};
