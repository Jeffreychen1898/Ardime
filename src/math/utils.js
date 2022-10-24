import Mat4 from "./mat4.js";

/* @param { number } */
function rotateX(_ang) {
	const rotate_matrix = [
		1, 0, 0, 0,
		0, Math.cos(_ang), -Math.sin(_ang), 0,
		0, Math.sin(_ang), -Math.cos(_ang), 0,
		0, 0, 0, 1
	];

	return new Mat4(rotate_matrix);
}

/* @param { number } */
function rotateY(_ang) {
	const rotate_matrix = [
		Math.cos(_ang), 0, Math.sin(_ang), 0,
		0, 1, 0, 0,
		-Math.sin(_ang), 0, Math.cos(_ang), 0,
		0, 0, 0, 1
	];

	return new Mat4(rotate_matrix);
}

/* @param { number } */
function rotateZ(_ang) {
	const rotate_matrix = [
		Math.cos(_ang), -Math.sin(_ang), 0, 0,
		Math.sin(_ang), Math.cos(_ang), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	];
	for(let i=0;i<rotate_matrix.length;++i) {
		rotate_matrix[i] *= 100000;
		rotate_matrix[i] = Math.floor(rotate_matrix[i]);
		rotate_matrix[i] /= 100000;
	}

	return new Mat4(rotate_matrix);
}

/* @param { number, number, number, number, number, number } */
function projection2d(_left, _right, _top, _bottom, _near, _far) {
	const projection = [
		2/(_right-_left), 0, 0, -(_right+_left)/(_right-_left),
		0, 2/(_top-_bottom), 0, -(_top+_bottom)/(_top-_bottom),
		0, 0, -2/(_far-_near), -(_far+_near)/(_far-_near),
		0, 0, 0, 1
	];

	return new Mat4(projection);
}

/* @param { number, number, number, number, number, number } */
function projection3d(_left, _right, _top, _bottom, _near, _far) {
	const projection = [
		(2*_near)/(_right-_left), 0, (_right+_left)/(_right-_left), 0,
		0, (2*_near)/(_top-_bottom), (_top+_bottom)/(_top-_bottom), 0,
		0, 0, -(_far+_near)/(_far-_near), -(2*_far*_near)/(_far-_near),
		0, 0, -1, 0
	];

	return new Mat4(projection);
}

const getMatrix = {
	rotateX,
	rotateY,
	rotateZ,
	projection2d,
	projection3d
};

export {
	getMatrix
};
