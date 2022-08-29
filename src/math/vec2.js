import Mat2 from "./mat2.js";
import * as Utils from "./utils.js";

class Vec2 {
	constructor(x, y) {
		if(!x) { // no parameter is passed
			this.x = 0;
			this.y = 0;
		} else if(!y) { // one parameter is passed
			this.x = x;
			this.y = x;
		} else {
			this.x = x;
			this.y = y;
		}
	}

	multiply(val) {
		if(val instanceof Mat2) {
			const copy = [this.x, this.y];

			this.x =
				val.getCell(0, 0) * copy[0] +
				val.getCell(0, 1) * copy[1];
			this.y =
				val.getCell(1, 0) * copy[0] +
				val.getCell(1, 1) * copy[1];

			return;
		}

		if(typeof(val) == "number") {
			this.x *= val;
			this.y *= val;

			return;
		}

		const exception = "[ERROR] Vec2 can only be multiplied by a scalar or a Mat2!";
		throw new Utils.InvalidOperation(exception);
	}

	add(vector) {
		if(vector instanceof Vec2) {
			this.x += val;
			this.y += val;

			return;
		}

		const exception = "[ERROR] Vec2 can only be added by another Vec2!";
		throw new Utils.InvalidOperation(exception);
	}

	subtract(vector) {
		if(vector instanceof Vec2) {
			this.x -= val;
			this.y -= val;

			return;
		}

		const exception = "[ERROR] Vec2 can only be subtracted by another Vec2!";
		throw new Utils.InvalidOperation(exception);
	}
}

export default Vec2;
