class InvalidOperation extends Error {
	constructor(message) {
		super(message);
	}
}

function rotateXRaw(ang) {
	const new_matrix = [
		1, 0, 0, 0,
		0, Math.cos(ang), -Math.sin(ang), 0,
		0, Math.sin(ang), -Math.cos(ang), 0,
		0, 0, 0, 1
	];

	return new_matrix;
}

function rotateYRaw(ang) {
	const new_matrix = [
		Math.cos(ang), 0, Math.sin(ang), 0,
		0, 1, 0, 0,
		-Math.sin(ang), 0, Math.cos(ang), 0,
		0, 0, 0, 1
	];

	return new_matrix;
}

function rotateZRaw(ang) {
	const new_matrix = [
		Math.cos(ang), -Math.sin(ang), 0, 0,
		Math.sin(ang), Math.cos(ang), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	];
	for(let i=0;i<new_matrix.length;++i) {
		new_matrix[i] *= 100000;
		new_matrix[i] = Math.floor(new_matrix[i]);
		new_matrix[i] = new_matrix[i] / 100000;
	}

	return new_matrix;
}

function projection2dRaw(l, r, t, b, n, f) {
	const projection = [
		2/(r-l), 0, 0, -(r+l)/(r-l),
		0, 2/(t-b), 0, -(t+b)/(t-b),
		0, 0, -2/(f-n), -(f+n)/(f-n),
		0, 0, 0, 1
	];

	return projection;
}

function projection3dRaw(l, r, t, b, n, f) {
	const projection = [
		(2*n)/(r-l), 0, (r+l)/(r-l), 0,
		0, (2*n)/(t-b), (t+b)/(t-b), 0,
		0, 0, -(f+n)/(f-n), -(2*f*n)/(f-n),
		0, 0, -1, 0
	];

	return projection;
}

export {
	InvalidOperation,
	rotateXRaw,
	rotateYRaw,
	rotateZRaw,
	projection2dRaw,
	projection3dRaw
};
