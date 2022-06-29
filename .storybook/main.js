const path = require('path');
// your app's webpack.config.js
const custom = require('../webpack.config.js');

module.exports = {
    stories: ['../src/**/*.story.[tj]s'],
  webpackFinal: (config) => {
    return { ...config, module: { ...config.module, rules: custom.module.rules } };
  },
};