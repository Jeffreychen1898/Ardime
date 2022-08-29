import Mat4 from "./mat4.js";
import * as Utils from "./utils.js";

class Vec4 {
	constructor(x, y, z, w) {
		if(!x) { // no parameter is passed
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 0;
		} else if(!y) { // one parameter is passed
			this.x = x;
			this.y = x;
			this.z = x;
			this.w = x;
		} else {
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;
		}
	}

	multiply(val) {
		if(val instanceof Mat4) {
			const copy = [this.x, this.y, this.z, this.w];

			this.x =
				val.getCell(0, 0) * copy[0] +
				val.getCell(0, 1) * copy[1] +
				val.getCell(0, 2) * copy[2] +
				val.getCell(0, 3) * copy[3];
			this.y =
				val.getCell(1, 0) * copy[0] +
				val.getCell(1, 1) * copy[1] +
				val.getCell(1, 2) * copy[2] +
				val.getCell(1, 3) * copy[3];
			this.z =
				val.getCell(2, 0) * copy[0] +
				val.getCell(2, 1) * copy[1] +
				val.getCell(2, 2) * copy[2] +
				val.getCell(2, 3) * copy[3];
			this.w =
				val.getCell(3, 0) * copy[0] +
				val.getCell(3, 1) * copy[1] +
				val.getCell(3, 2) * copy[2] +
				val.getCell(3, 3) * copy[3];

			return;
		}

		if(typeof(val) == "number") {
			this.x *= val;
			this.y *= val;
			this.z *= val;
			this.w *= val;

			return;
		}

		const exception = "[ERROR] Vec4 can only be multiplied by a scalar or a Mat4!";
		throw new Utils.InvalidOperation(exception);
	}

	add(vector) {
		if(vector instanceof Vec4) {
			this.x += val;
			this.y += val;
			this.z += val;
			this.w += val;

			return;
		}

		const exception = "[ERROR] Vec4 can only be added by another Vec4!";
		throw new Utils.InvalidOperation(exception);
	}

	subtract(vector) {
		if(vector instanceof Vec4) {
			this.x -= val;
			this.y -= val;
			this.z -= val;
			this.w -= val;

			return;
		}

		const exception = "[ERROR] Vec4 can only be subtracted by another Vec4!";
		throw new Utils.InvalidOperation(exception);
	}
}

export default Vec4;
