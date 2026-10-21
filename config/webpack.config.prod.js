const config = require('./webpack.config.js');

config.mode = 'production';

// Babel's env doesn't follow webpack's mode and would otherwise compile JSX for React's development build
config.module.rules.find((rule) => rule.loader === 'babel-loader').options = { envName: 'production' };

module.exports = config;
