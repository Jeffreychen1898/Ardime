const lineReader = require("line-reader");
const fs = require("fs");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const SHADER_READ_PATH = "res/shaders/";
const SHADER_WRITE_PATH = "src/renderer/graphicsAPI/webgl/shadercode.js";
const shaders = [];

app.listen(PORT, () => {
	console.log(`Server has started on port: ${PORT}`);
	
	createShaderJsFile(SHADER_READ_PATH, SHADER_WRITE_PATH);
});

app.use("/", express.static("views"));
app.use("/ardime", express.static("../build"));

function createShaderJsFile(readpath, writepath) {
	let number_of_shaders = 0;
	let shaders_loaded = 0;
	const shader_code = {};
	//read the list of shaders
	lineReader.eachLine(readpath + "shaders.txt", (line) => {
		if(line.includes("END")) {
			console.log(`${number_of_shaders} shaders found!`);
		} else {
			try {
				++ number_of_shaders;
				loadShaders(readpath + "/webgl/" + line, (code) => {
					console.log(`finished loading shader "${line}"!`);
					shader_code[line] = code;
					++ shaders_loaded;

					if(number_of_shaders == shaders_loaded && number_of_shaders > 0) {
						writeShaderJsFile(shader_code, writepath);
					}
				});
			} catch(err) {
				console.log(err);
			}
		}
	});
}

function writeShaderJsFile(codes, path) {
	const source_codes =
		"const shaders = "
		+ JSON.stringify(codes)
		+ "; export default shaders;";
	fs.writeFileSync(path, source_codes);
}

async function loadShaders(path, callback) {
	return new Promise((resolve, reject) => {
		const vertex_path = path + "/vertex.vs";
		const fragment_path = path + "/fragment.fs";

		let vertex_code = "";
		let fragment_code = "";

		fs.readFile(vertex_path, "utf8", (err, data) => {
			
			if(!err) {
				vertex_code = data;
				if(fragment_code.length > 0) {
					const result = {
						vertex: vertex_code,
						fragment: fragment_code
					};
					callback(result);
					resolve();
				}
			} else {
				reject(err);
			}
		});

		fs.readFile(fragment_path, "utf8", (err, data) => {
			
			if(!err) {
				fragment_code = data;
				if(vertex_code.length > 0) {
					const result = {
						vertex: vertex_code,
						fragment: fragment_code
					};
					callback(result);
					resolve();
				}
			} else {
				reject(err);
			}
		});
	});
}
