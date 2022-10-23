import * as Ardime from "./ardime/index.js";

window.onload = () => {
	const settings = {
		canvas: "canvas",
		width: 800,
		height: 600
	};
	const renderer = new Ardime.Renderer(settings);
	const url = "/testImage.png";
	const testImage = new Ardime.Image(url, {}, () => {
		gameloop(renderer, testImage);
	});
}

let pos = 50;
function gameloop(renderer, img) {
	renderer.draw.image(img, 0, 0, 100, 100);
	//renderer.draw.rect(0, 0, pos += 5, 100);
	renderer.makeDrawCall();

	requestAnimationFrame(() => {
		gameloop(renderer, img);
	});
}