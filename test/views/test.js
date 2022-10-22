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

function gameloop(renderer, img) {
	renderer.draw.image(img, 100, 100, 100, 100);
	renderer.makeDrawCall();

	requestAnimationFrame(() => {
		//gameloop(renderer);
	});
}