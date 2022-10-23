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

let performance = new Ardime.Performance();
function gameloop(renderer, img) {
	performance.stop();
	//console.log(1 / performance.getElapsedTime("seconds"));
	performance.start();

	renderer.draw.rect(-400, -300, 800, 600, { color: [255, 0, 0, 255]});
	renderer.draw.image(img, 0, 0, 100, 100, { color: [255, 255, 0, 255]});
	//renderer.draw.rect(-400, -300, 400, 300);
	//renderer.draw.rect(0, 0, pos += 5, 100);
	renderer.makeDrawCall();

	requestAnimationFrame(() => {
		gameloop(renderer, img);
	});
}