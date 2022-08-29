precision mediump float;

attribute vec2 a_position;
attribute vec4 a_color;
attribute vec2 a_texCoord;

uniform mat4 u_projection;

varying vec4 v_color;
varying vec2 v_texCoord;

void main()
{
	gl_Position = u_projection * vec4(a_position, 0.0, 1.0);
	v_color = a_color;
	v_texCoord = a_texCoord;
}
