precision mediump float;

uniform sampler2D u_texture;

varying vec4 v_color;

void main() {
	//gl_FragColor = texture2D(u_texture, v_texCoord) * v_color;
	gl_FragColor = v_color;
}
