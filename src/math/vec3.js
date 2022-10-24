import Mat3 from "./mat3.js";

class Vec3 {
	constructor(_x, _y, _z) {
		if(!_x) { // no parameter is passed
			this.x = 0;
			this.y = 0;
			this.z = 0;
		} else if(!_y) { // one parameter is passed
			this.x = _x;
			this.y = _x;
			this.z = _x;
		} else {
			this.x = _x;
			this.y = _y;
			this.z = _z;
		}
	}

	multiply(_val) {
		if(_val instanceof Mat3) {
			const copy = [this.x, this.y, this.z];

			this.x =
				_val.getCell(0, 0) * copy[0] +
				_val.getCell(0, 1) * copy[1] +
				_val.getCell(0, 2) * copy[2];
			this.y =
				_val.getCell(1, 0) * copy[0] +
				_val.getCell(1, 1) * copy[1] +
				_val.getCell(1, 2) * copy[2];
			this.z =
				_val.getCell(2, 0) * copy[0] +
				_val.getCell(2, 1) * copy[1] +
				_val.getCell(2, 3) * copy[2];

			return;
		}

		if(typeof(_val) == "number") {
			this.x *= _val;
			this.y *= _val;
			this.z *= _val;

			return;
		}

		const exception = "[ERROR] Vec3 can only be multiplied by a scalar or a Mat3!";
		throw new Error(exception);
	}

	add(_vector) {
		if(_vector instanceof Vec3) {
			this.x += val;
			this.y += val;
			this.z += val;

			return;
		}

		const exception = "[ERROR] Vec3 can only be added by another Vec3!";
		throw new Error(exception);
	}

	subtract(_vector) {
		if(_vector instanceof Vec3) {
			this.x -= val;
			this.y -= val;
			this.z -= val;

			return;
		}

		const exception = "[ERROR] Vec3 can only be subtracted by another Vec3!";
		throw new Error(exception);
	}
}

export default Vec3;
