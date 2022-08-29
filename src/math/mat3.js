import Matrix from "./matrix.js";
import * as Utils from "./utils.js";

class Mat3 extends Matrix {
	constructor(matrix) {
		if(typeof(matrix) == "object") {
			super(matrix);
			return;
		}

		super(3);
	}

	/* @param {Matrix | number} */
	multiply(value) {
		if(value instanceof Mat3) {
			const copy = this.m_matrix.slice(0);
			const operation = (r, c) => {
				const result =
					copy[0 +r] * value.getCell(0, c) +
					copy[3 +r] * value.getCell(1, c) +
					copy[6 +r] * value.getCell(2, c);

				return result;
			}
			for(let i=0;i<3;++i) {
				for(let j=0;j<3;++j) {
					this.m_matrix[i*3+j] = operation(j, i);
				}
			}

			return;
		}

		if(typeof(value) == "number") {
			for(let i=0;i<this.m_matrix.length;++i)
				this.m_matrix[i] *= value;

			return;
		}

		const exception = "[ERROR] Mat3 can only be multiplied by a scalar or another Mat3!";
		throw new Utils.InvalidOperation(exception);
	}

	inverse() {
		const copy = this.m_matrix.slice(0);
		this.adjoint();

		const determinent =
			copy[0] * this.m_matrix[0] +
			copy[1] * this.m_matrix[3] +
			copy[2] * this.m_matrix[6];

		if(determinent == 0) {
			const exception = "[ERROR] Matrix cannot be inverted due to a determinent of 0!";
			throw new Utils.InvalidOperation(exception);
		}

		this.multiply(1 / determinent);
	}

	adjoint() {
		const adjugate_matrix = new Float32Array(this.m_size * this.m_size);
		for(let i=0;i<adjugate_matrix.length;++i) {
			const row0 = Math.floor(i / 3);
			const col0 = i % 3;

			const minor = new Float32Array(4);
			for(let j=0;j<minor.length;++j) {
				const row1 = Math.floor(j / 2) >= row0 ? Math.floor(j / 2) + 1 : Math.floor(j / 2);
				const col1 = j % 2 >= col0 ? (j % 2) + 1 : j % 2;
				minor[j] = this.m_matrix[row1 * 3 + col1];
			}

			let determinent = minor[0] * minor[3] - minor[2] * minor[1];

			adjugate_matrix[col0 * 3 + row0] = (row0 % 2 == col0 % 2) ? determinent : -determinent;
		}

		this.m_matrix = adjugate_matrix
	}
}

export default Mat3;
