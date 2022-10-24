import Matrix from "./matrix.js";

class Mat2 extends Matrix {
	constructor(_matrix) {
		if(typeof(_matrix) == "object") {
			super(_matrix);
			return;
		}

		super(2);
	}

	/* @param {Matrix | number} */
	multiply(_value) {
		if(_value instanceof Mat2) {
			const copy = this.m_matrix.slice(0);
			const operation = (r, c) => {
				const result =
					copy[0 +r] * _value.getCell(0, c) +
					copy[2 +r] * _value.getCell(1, c)

				return result;
			}
			for(let i=0;i<2;++i) {
				for(let j=0;j<2;++j) {
					this.m_matrix[i*2+j] = operation(j, i);
				}
			}

			return;
		}

		if(typeof(_value) == "number") {
			for(let i=0;i<this.m_matrix.length;++i)
				this.m_matrix[i] *= _value;

			return;
		}

		const exception = "[ERROR] Mat3 can only be multiplied by a scalar or another Mat3!";
		throw new Error(exception);
	}

	inverse() {
		this.adjoint();

		const determinent =
			this.m_matrix[0] * this.m_matrix[3] - this.m_matrix[1] * this.m_matrix[2];

		if(determinent == 0) {
			const exception = "[ERROR] Matrix cannot be inverted due to a determinent of 0!";
			throw new Error(exception);
		}

		this.multiply(1 / determinent);
	}

	adjoint() {
		const copy = this.m_matrix.slice(0);

		this.m_matrix[0] =  copy[3];
		this.m_matrix[1] = -copy[1];
		this.m_matrix[2] = -copy[2];
		this.m_matrix[3] =  copy[0];
	}
}

export default Mat2;
