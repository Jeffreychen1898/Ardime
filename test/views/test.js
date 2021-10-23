import * as Ardime from "/ardime/index.js"

window.onload = () => {
	const settings = {
		canvas: "canvas",
		width: 800,
		height: 600
	};
	const renderer = new Ardime.Renderer(settings);
	//gameloop(renderer);
}

function gameloop(renderer) {
	renderer.drawRectangle();

	requestAnimationFrame(() => {
		gameloop(renderer);
	});
}
