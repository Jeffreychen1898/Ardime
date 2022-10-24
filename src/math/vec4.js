import Mat4 from "./mat4.js";

class Vec4 {
	constructor(_x, _y, _z, _w) {
		if(!_x) { // no parameter is passed
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 0;
		} else if(!y) { // one parameter is passed
			this.x = _x;
			this.y = _x;
			this.z = _x;
			this.w = _x;
		} else {
			this.x = _x;
			this.y = _y;
			this.z = _z;
			this.w = _w;
		}
	}

	multiply(_val) {
		if(_val instanceof Mat4) {
			const copy = [this.x, this.y, this.z, this.w];

			this.x =
				_val.getCell(0, 0) * copy[0] +
				_val.getCell(0, 1) * copy[1] +
				_val.getCell(0, 2) * copy[2] +
				_val.getCell(0, 3) * copy[3];
			this.y =
				_val.getCell(1, 0) * copy[0] +
				_val.getCell(1, 1) * copy[1] +
				_val.getCell(1, 2) * copy[2] +
				_val.getCell(1, 3) * copy[3];
			this.z =
				_val.getCell(2, 0) * copy[0] +
				_val.getCell(2, 1) * copy[1] +
				_val.getCell(2, 2) * copy[2] +
				_val.getCell(2, 3) * copy[3];
			this.w =
				_val.getCell(3, 0) * copy[0] +
				_val.getCell(3, 1) * copy[1] +
				_val.getCell(3, 2) * copy[2] +
				_val.getCell(3, 3) * copy[3];

			return;
		}

		if(typeof(_val) == "number") {
			this.x *= _val;
			this.y *= _val;
			this.z *= _val;
			this.w *= _val;

			return;
		}

		const exception = "[ERROR] Vec4 can only be multiplied by a scalar or a Mat4!";
		throw new Error(exception);
	}

	add(_vector) {
		if(_vector instanceof Vec4) {
			this.x += val;
			this.y += val;
			this.z += val;
			this.w += val;

			return;
		}

		const exception = "[ERROR] Vec4 can only be added by another Vec4!";
		throw new Error(exception);
	}

	subtract(_vector) {
		if(_vector instanceof Vec4) {
			this.x -= val;
			this.y -= val;
			this.z -= val;
			this.w -= val;

			return;
		}

		const exception = "[ERROR] Vec4 can only be subtracted by another Vec4!";
		throw new Error(exception);
	}
}

export default Vec4;
