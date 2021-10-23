const lineReader = require("line-reader");
const fs = require("fs");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const shaders = [];

app.listen(PORT, () => {
	console.log(`Server has started on port: ${PORT}`);
	
	createShaderJsFile();
});

app.set("view engine", "ejs");

app.use("/script/test", express.static("test/views"));
app.use("/ardime", express.static("src"));

function createShaderJsFile() {
	let number_of_shaders = 0;
	let shaders_loaded = 0;
	const shader_code = {};
	//read the list of shaders
	lineReader.eachLine("src/shaders/shaders.txt", (line) => {
		if(line.includes("END")) {
			console.log(`${number_of_shaders} shaders found!`);
		} else {
			try {
				++ number_of_shaders;
				loadShaders("src/shaders/webgl/" + line, (code) => {
					console.log(`finished loading shader "${line}"!`);
					shader_code[line] = code;
					++ shaders_loaded;

					if(number_of_shaders == shaders_loaded && number_of_shaders > 0) {
						writeShaderJsFile(shader_code);
					}
				});
			} catch(err) {
				console.log(err);
			}
		}
	});
}

function writeShaderJsFile(codes) {
	const source_codes =
		"const shaders = "
		+ JSON.stringify(codes)
		+ "; export shaders;";
	fs.writeFileSync("src/shaders/webgl/shadercode.js", source_codes);
}

async function loadShaders(path, callback) {
	return new Promise((resolve, reject) => {
		const vertex_path = path + "/vertex.glsl";
		const fragment_path = path + "/fragment.glsl";

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

app.get("/", (req, res) => {
	res.render("test");
});
