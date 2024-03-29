precision mediump float;

uniform sampler2D u_texture;

varying vec4 v_color;
varying vec2 v_texCoord;

void main() {
	gl_FragColor = texture2D(u_texture, v_texCoord) * (v_color / vec4(255));
}
