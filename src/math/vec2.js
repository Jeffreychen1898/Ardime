import Mat2 from "./mat2.js";

class Vec2 {
	constructor(_x, _y) {
		if(!x) { // no parameter is passed
			this.x = 0;
			this.y = 0;
		} else if(!_y) { // one parameter is passed
			this.x = _x;
			this.y = _x;
		} else {
			this.x = _x;
			this.y = _y;
		}
	}

	multiply(_val) {
		if(_val instanceof Mat2) {
			const copy = [this.x, this.y];

			this.x =
				_val.getCell(0, 0) * copy[0] +
				_val.getCell(0, 1) * copy[1];
			this.y =
				_val.getCell(1, 0) * copy[0] +
				_val.getCell(1, 1) * copy[1];

			return;
		}

		if(typeof(_val) == "number") {
			this.x *= _val;
			this.y *= _val;

			return;
		}

		const exception = "[ERROR] Vec2 can only be multiplied by a scalar or a Mat2!";
		throw new Error(exception);
	}

	add(_vector) {
		if(_vector instanceof Vec2) {
			this.x += val;
			this.y += val;

			return;
		}

		const exception = "[ERROR] Vec2 can only be added by another Vec2!";
		throw new Error(exception);
	}

	subtract(_vector) {
		if(_vector instanceof Vec2) {
			this.x -= val;
			this.y -= val;

			return;
		}

		const exception = "[ERROR] Vec2 can only be subtracted by another Vec2!";
		throw new Error(exception);
	}
}

export default Vec2;
