precision mediump float;

uniform sampler2D u_texture;

void main() {
	//gl_FragColor = texture2D(u_texture, v_texCoord) * v_color;
	gl_FragColor = vec4(1, 1, 1, 1);
}
