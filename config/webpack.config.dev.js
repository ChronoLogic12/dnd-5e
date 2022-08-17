const path = require('path');
const config = require('./webpack.config.js');

config.devServer = {
	historyApiFallback: true,
	static: path.resolve('src'),
	port: 8080,
	hot: true,
	open: true,
};

config.devtool = 'inline-source-map';

module.exports = config;
