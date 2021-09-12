import * as Ardime from "/ardime/index.js"

window.onload = () => {
	const settings = {
		canvas: "canvas",
		width: 800,
		height: 600
	};
	const Renderer = Ardime.createRenderer(settings);
}
