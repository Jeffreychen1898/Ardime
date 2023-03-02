# Camera 2D
## Creating a 2D Camera
```javascript
/* parameter: width, height */
/* parameter: x, y, width, height */
/* parameter: x, y, width, height, far */
const new_camera = new Ardime.Camera2D(0, 0, 800, 600);

new_camera.setBaseProjection([
	[1, 0, 0, 0],
	[0, 1, 0, 0],
	[0, -1, -1, 0],
	[0, 0, 0, 1]
]); // 2.5D view

new_camera.createMatrix();
```
## Using the default camera
The renderer has a default camera in which it uses. This camera can be manipulated, which will result in all of the renderer's shape being affected unless they are under a different shader program that does not use the renderer's camera.
```javascript
const get_default_camera = renderer.getCamera();
```
## Methods
```javascript
/* parameter: nested array */
// This matrix is multiplied by the orthographic matrix, so this affects the camera's projection
new_camera.setBaseProjection(matrix);

// Must be called everytime the camera's properties are modified. This updates the camera's matrix
new_camera.createMatrix();
```
### Getters
```javascript
new_camera.getUniformContainer(); // returns the uniform container of the camera matrix (used for shaders)
new_camera.getMatrix(); // returns the camera matrix
new_camera.getAngle(); // returns the rotation angle of the camera
new_camera.getFar(); // returns the far value of the camera
new_camera.getNear(); // returns the near value of the camera
new_camera.getWidth(); // returns the width of the camera
new_camera.getHeight(); // returns the height of the camera
new_camera.getX(); // returns the x coordinate of the camera
new_camera.getY(); // returns the y coordinate of the camera
new_camera.getSize(); // returns the size of the camera in the format {width, height}
new_camera.getPosition(); // returns the position of the camera in the format {x, y}
```
### Setters
```javascript
new_camera.move(x, y); // moves the camera by x units and y units
new_camera.setPosition(x, y); // set the position of the camera
new_camera.setNearFar(near, far); // set the near and far value of the camera
new_camera.resize(width, height); // set the size of the camera
new_camera.setAngle(angle); // set the angle of the camera
new_camera.rotateAngle(angle); // rotate the camera by a certain amount of radians
```