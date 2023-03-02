# Setup
## Dependencies
It should be noted that the following libraries will need to be included in the HTML in order for this renderer to work.
* math.js
## Starter Code
```javascript
window.onload = () => {
	// setup the settings for the renderer
	const settings = {
		canvas: "canvas", // your canvas id
		width: 800,
		height: 600
	};

	// the renderer depends on the math.js library
	Ardime.useLibrary("mathjs", math);
	
	// create the renderer instance
	const renderer = new Ardime.Renderer(settings);

	gameloop(renderer);
}

function gameloop(renderer) {
	renderer.clear();
	/*
	renderer.clear({ depth: true }); // if depth is used
	*/
	renderer.draw.rect(-100, -100, 200, 200, { color: [255, 0, 0, 255]});

	renderer.flush();

	requestAnimationFrame(() => {
		gameloop(renderer);
	});
}
```