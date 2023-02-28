import * as Ardime from "./ardime/index.js";

const vertex_shader = `
precision mediump float;

attribute vec2 a_position;

uniform mat4 u_projection;

void main()
{
	gl_Position = u_projection * vec4(a_position, 0.0, 1.0);
}
`;
const fragment_shader = `
precision mediump float;

void main() {
	gl_FragColor = vec4(1.0);
}
`;

let test_shader = null;

const keyset = new Set();

window.onload = () => {
	document.addEventListener("keydown", keypressed);
	document.addEventListener("keyup", keyreleased);
	const settings = {
		canvas: "canvas",
		width: 800,
		height: 600
	};
	Ardime.useLibrary("mathjs", math);
	const renderer = new Ardime.Renderer(settings);
	const url = "/testImage.png";

	test_shader = renderer.create.shader(vertex_shader, fragment_shader,
	[
		{name: "a_position", size: 2}
	],
	[
		{name: "u_projection", value: renderer.getCamera().getUniformContainer()}
	]);

	const testImage = new Ardime.Image(url, {}, () => {
		gameloop(renderer, testImage);
	});
}

let performance = new Ardime.Performance();
function gameloop(renderer, img) {
	performance.stop();
	//console.log(1 / performance.getElapsedTime("seconds"));
	performance.start();

	cameraControl(renderer.getCamera());
	renderer.draw.rect(-400, -300, 800, 600, { color: [255, 0, 0, 255]});

	const test_shape = renderer.draw.shape.new();
	renderer.draw.shape.vertex(test_shape, {
		a_position: [100, 100]
	}, true);
	renderer.draw.shape.vertex(test_shape, {
		a_position: [200, 100]
	}, true);
	renderer.draw.shape.vertex(test_shape, {
		a_position: [200, 200]
	}, true);
	renderer.draw.shape.vertex(test_shape, {
		a_position: [100, 200]
	}, true);
	renderer.draw.shape.draw(test_shape, test_shader);

	renderer.draw.image(img, 0, 0, 100, 100, { color: [255, 255, 0, 255]});
	//renderer.draw.rect(-400, -300, 400, 300);
	//renderer.draw.rect(0, 0, pos += 5, 100);
	//renderer.makeDrawCall();
	renderer.flush();

	requestAnimationFrame(() => {
		gameloop(renderer, img);
	});
}

function cameraControl(_camera) {
	const camera = _camera;

	if(keyset.has(65)) // left
		camera.move(-5 * Math.cos(camera.getAngle()), -5 * Math.sin(camera.getAngle()));
	if(keyset.has(68)) // right
		camera.move(5 * Math.cos(camera.getAngle()), 5 * Math.sin(camera.getAngle()));
	if(keyset.has(83)) // down
		camera.move(-5 * Math.sin(camera.getAngle()), 5 * Math.cos(camera.getAngle()));
	if(keyset.has(87)) // up
		camera.move(5 * Math.sin(camera.getAngle()), -5 * Math.cos(camera.getAngle()));
	if(keyset.has(81)) // counterclock
		camera.rotateAngle(-0.1);
	if(keyset.has(69)) // clockwise
		camera.rotateAngle(0.1);

	//camera.resize(100, 100);
	camera.createMatrix();
}

function keypressed(e) {
	if(!keyset.has(e.keyCode))
		keyset.add(e.keyCode);
}

function keyreleased(e) {
	if(keyset.has(e.keyCode))
		keyset.delete(e.keyCode);
}
