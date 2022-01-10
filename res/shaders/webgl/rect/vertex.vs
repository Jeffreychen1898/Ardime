precision mediump float;
attribute vec2 vertPosition;

uniform vec4 color;

varying vec4 v_color;

void main()
{
	gl_Position = vec4(vertPosition, 0.0, 1.0);
	v_color = color;
}