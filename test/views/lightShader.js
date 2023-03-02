import * as Ardime from "./ardime/index.js";

const vertex_shader = `
precision mediump float;

attribute vec3 a_position;
attribute vec3 a_normal;

uniform mat4 u_projection;

varying vec3 v_normal;
varying vec3 v_position;

void main() {
	gl_Position = u_projection * vec4(a_position, 1.0);
	v_normal = a_normal;
	v_position = a_position;
}
`;

const fragment_shader = `
precision mediump float;

varying vec3 v_normal;
varying vec3 v_position;

void main() {
	vec3 view_position = vec3(0.0, 0.0, 400.0);
	vec3 light_source = vec3(100.0, 100.0, 400.0);
	vec3 object_color = vec3(0.0, 0.659, 0.42);
	/* colors */
	vec3 ambient_color = vec3(0.135, 0.2225, 0.1575);
	vec3 diffuse_color = vec3(0.54, 0.89, 0.63);
	vec3 specular_color = vec3(0.316228, 0.316228, 0.316228);
	/* light intensity */
	float ambient_intensity = 0.1;
	float specular_intensity = 0.5;
	float shiny = 12.8;

	/* calculate ambient */
	vec3 ambient_light = ambient_intensity * ambient_color;

	/* calculate diffuse */
	vec3 point_to_light = normalize(light_source - v_position);
	float diffuse_intensity = max(dot(point_to_light, v_normal), 0.0);
	vec3 diffuse_light = diffuse_intensity * diffuse_color;

	/* calculate specular */
	vec3 view_direction = normalize(view_position - v_position);
	vec3 light_reflect = reflect(-point_to_light, v_normal);
	
	float specular = pow(max(dot(light_reflect, view_direction), 0.0), shiny);
	vec3 specular_light = specular_intensity * specular * specular_color;

	/* putting the colors together */
	vec3 final_color = (ambient_light + diffuse_light + specular_light) * object_color;
	gl_FragColor = vec4(final_color, 1.0);
}
`;

let renderer = null;
let light_shader = null;

window.onload = () => {
	const settings = {
		canvas: "canvas",
		width: 800,
		height: 600
	};
	Ardime.useLibrary("mathjs", math);
	renderer = new Ardime.Renderer(settings);

	light_shader = renderer.create.shader(vertex_shader, fragment_shader, [
		{ name: "a_position", size: 3 },
		{ name: "a_normal", size: 3 }
	], [
		{ name: "u_projection", value: renderer.getCamera().getUniformContainer() }
	]);

	gameloop();
}

function gameloop() {
	renderer.clear();

	const my_shape = renderer.draw.shape.new();
	renderer.draw.shape.vertex(my_shape, {
		a_position: [-400, -300, 0],
		a_normal: [0, 0, 1]
	}, true);
	renderer.draw.shape.vertex(my_shape, {
		a_position: [400, -300, 0],
		a_normal: [0, 0, 1]
	}, true);
	renderer.draw.shape.vertex(my_shape, {
		a_position: [400, 300, 0],
		a_normal: [0, 0, 1]
	}, true);
	renderer.draw.shape.vertex(my_shape, {
		a_position: [-400, 300, 0],
		a_normal: [0, 0, 1]
	}, true);

	renderer.draw.shape.draw(my_shape, light_shader);

	renderer.flush();

	requestAnimationFrame(gameloop);
}




