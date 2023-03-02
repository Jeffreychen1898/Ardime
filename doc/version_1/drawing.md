# Drawing Shapes
This version of the renderer only supports 3 different ways to draw shapes:
* Rectangles
* Images
* Polygons

### Rendering Options

When drawing shapes, it should be noted that you can specify the "rendering option" for a shape but this is not a must. It is also not mandatory to specify every options. Any options that are left unspecified will default to the default value. As of this version, there are three rendering options:
* align
	* The default value for align is ```"top left"``` where the "top" refers to the vertical align of the shape and the "left" refers to the horizontal align of the shape. These two words must be separated by a space.
	* Possible vertical aligns
		* top
		* center
		* bottom
	* Possible horizontal aligns
		* left
		* center
		* right
* color
	* The default color is white with full opacity. This parameter is an array of 4 elements. The indexes in the array represent the color channels in the following order: red, green, blue, alpha.
* angle
	* The default angle is 0 radians. If a shape need to be rotated, this specifies the angle in which the shape is rotated.

### Setting Default Rendering Options
```javascript
/*
the default rendering option values
can be overriden to a specific value
that you want
*/

// this sets the default color of every shape to yellow
const drawing_options = {
	color: [255, 255, 0, 255]
};

renderer.setDefaultOption(drawing_options);
```

### Drawing Rectangles
```javascript
const drawing_options = {
	color: [255, 0, 255, 255],
	align: "center center",
	angle: Math.PI / 4
};

/* parameters: x, y, width, height, rendering options */
renderer.draw.rect(0, 0, 100, 100, drawing_options);
```
### Drawing Images
Loading the image
```javascript
// the following are the only available properties at the moment
const properties = {
	smooth: true
};
/* parameters: url, properties, callback */
const my_image = new Ardime.Image(url, properties, callback);

function callback() {
	console.log("image is successfully loaded");
}
```
Drawing the image
```javascript
const drawing_options = {
	color: [255, 0, 255, 255], // applies a tint on the image
	align: "center center",
	angle: Math.PI / 4
};

/* parameters: image, x, y, width, height, rendering options */
renderer.draw.image(my_image, 0, 0, 100, 100, drawing_options);
```

### Draw Polygons
```javascript
renderer.bindTexture(image, 0); // drawing a polygon with a texture
const my_shape = renderer.draw.shape.new();
renderer.draw.shape.vertex(my_shape, {
	// specifying any of these are optional
	position: [-100, 100],
	color: [255, 255, 0, 255],
	texCoord: [0, 0]
});
renderer.draw.shape.vertex(my_shape, {
	position: [100, 100],
	color: [255, 255, 0, 255],
	texCoord: [0, 0]
});
renderer.draw.shape.vertex(my_shape, {
	// specifying any of these are optional
	position: [0, -100],
	color: [255, 255, 0, 255],
	texCoord: [0, 0]
});

renderer.draw.shape.draw(my_shape);