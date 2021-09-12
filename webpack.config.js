const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "Ardime.js",
		library: {
			name: "Ardime",
			type: "umd"
		}
	},
}
