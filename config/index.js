const path = require('path');


module.exports = {
	build: {
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsFile: path.resolve(__dirname, '../dist/**/*'),
		assetsSubDirectory: 'assets',
	}
}