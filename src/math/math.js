import Matrix from "./matrix.js";
import Vec2 from "./vec2.js";
import Vec3 from "./vec3.js";
import Vec4 from "./vec4.js";
import Mat2 from "./mat2.js";
import Mat3 from "./mat3.js";
import Mat4 from "./mat4.js";
import * as Utils from "./utils.js";

function rotateX(ang) {
	const raw_matrix = Utils.rotateXRaw(ang);
	const matrix = new Mat4(raw_matrix);

	return matrix;
}

function rotateY(ang) {
	const raw_matrix = Utils.rotateYRaw(ang);
	const matrix = new Mat4(raw_matrix);
	
	return matrix;
}

function rotateZ(ang) {
	const raw_matrix = Utils.rotateZRaw(ang);
	const matrix = new Mat4(raw_matrix);

	return matrix;
}

function projection2d(l, r, t, b, n, f) {
	const raw_matrix = Utils.projection2dRaw(l, r, t, b, n, f);
	const matrix = new Mat4(raw_matrix);

	return matrix;
}

function projection3d(l, r, t, b, n, f) {
	const raw_matrix = Utils.projection3dRaw(l, r, t, b, n, f);
	const matrix = new Mat4(raw_matrix);

	return matrix;
}

export {
	Matrix,
	Vec2,
	Vec3,
	Vec4,
	Mat2,
	Mat3,
	Mat4,
	rotateX,
	rotateY,
	rotateZ,
	projection2d,
	projection3d
};
