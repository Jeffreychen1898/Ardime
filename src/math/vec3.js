import Mat3 from "./mat3.js";
import * as Utils from "./utils.js";

class Vec3 {
	constructor(x, y, z) {
		if(!x) { // no parameter is passed
			this.x = 0;
			this.y = 0;
			this.z = 0;
		} else if(!y) { // one parameter is passed
			this.x = x;
			this.y = x;
			this.z = x;
		} else {
			this.x = x;
			this.y = y;
			this.z = z;
		}
	}

	multiply(val) {
		if(val instanceof Mat3) {
			const copy = [this.x, this.y, this.z];

			this.x =
				val.getCell(0, 0) * copy[0] +
				val.getCell(0, 1) * copy[1] +
				val.getCell(0, 2) * copy[2];
			this.y =
				val.getCell(1, 0) * copy[0] +
				val.getCell(1, 1) * copy[1] +
				val.getCell(1, 2) * copy[2];
			this.z =
				val.getCell(2, 0) * copy[0] +
				val.getCell(2, 1) * copy[1] +
				val.getCell(2, 3) * copy[2];

			return;
		}

		if(typeof(val) == "number") {
			this.x *= val;
			this.y *= val;
			this.z *= val;

			return;
		}

		const exception = "[ERROR] Vec3 can only be multiplied by a scalar or a Mat3!";
		throw new Utils.InvalidOperation(exception);
	}

	add(vector) {
		if(vector instanceof Vec3) {
			this.x += val;
			this.y += val;
			this.z += val;

			return;
		}

		const exception = "[ERROR] Vec3 can only be added by another Vec3!";
		throw new Utils.InvalidOperation(exception);
	}

	subtract(vector) {
		if(vector instanceof Vec3) {
			this.x -= val;
			this.y -= val;
			this.z -= val;

			return;
		}

		const exception = "[ERROR] Vec3 can only be subtracted by another Vec3!";
		throw new Utils.InvalidOperation(exception);
	}
}

export default Vec3;
