precision mediump float;

attribute vec2 a_position;

uniform vec4 u_color;

varying vec4 v_color;

void main()
{
	v_color = u_color;
	gl_Position = vec4(a_position, 0.0, 1.0);
}
