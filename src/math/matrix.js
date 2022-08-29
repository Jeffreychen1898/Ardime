class Matrix {
	/* @param{number | array, boolean} */
	constructor(val, transpose) {
		this.m_size = typeof(val) == "number" ? val : Math.sqrt(val.length);
		if(typeof(val) == "object") {
			// this class only support square matrices
			if(this.m_size % 1 == 0) {
				this.m_matrix = new Float32Array(val);
				if(!transpose)
					this.transpose();
				return;
			}

			this.m_size = 0;
		}

		this.m_matrix = new Float32Array(this.m_size * this.m_size);
		this.identity();
	}

	/* @param {Matrix | number} */
	multiply(value) {
		if(value instanceof Matrix && value.getSize() == this.m_size) {
			const copy = this.m_matrix.slice(0);
			for(let i=0;i<this.m_size;++i) {
				for(let j=0;j<this.m_size;++j) {

					let counter = 0;
					for(let k=0;k<this.m_size;++k)
						counter += copy[k * this.m_size + j] * value.getCell(k, i);

					this.m_matrix[i*4+j] = counter;
				}
			}

			return;
		}

		if(typeof(value) == "number") {
			for(let i=0;i<this.m_matrix.length;i++)
				this.m_matrix[i] *= value;

			return;
		}

		const exception = "[ERROR] You may only multiply by a scalar or another matrix of the same size!";
		throw new Utils.InvalidOperation(exception);
	}

	/* @parma {Mat4} */
	add(matrix) {
		if(matrix instanceof Matrix && matrix.getSize() == this.m_size) {
			const copy = this.m_matrix.slice(0);
			for(let i=0;i<this.m_size;++i) {
				for(let j=0;j<this.m_size;++j)
					this.m_matrix[i*this.m_size+j] = copy[i*this.m_size+j] + matrix.getCell(j, i);

			}
			return;
		}

		const exception = "[ERROR] You may only add with another matrix of the same size!";
		throw new Utils.InvalidOperation(exception);
	}

	/* @param {Mat4} */
	subtract(matrix) {
		if(matrix instanceof Matrix && matrix.getSize() == this.m_size) {
			const copy = this.m_matrix.slice(0);
			for(let i=0;i<this.m_size;++i) {
				for(let j=0;j<this.m_size;++j)
					this.m_matrix[i*this.m_size+j] = copy[i*this.m_size+j] - matrix.getCell(j, i);
			}
			return;
		}

		const exception = "[ERROR] You may only subtract with another matrix of the same size!";
		throw new Utils.InvalidOperation(exception);
	}

	identity() {
		for(let i=0;i<this.m_size;++i) {
			for(let j=0;j<this.m_size;++j) {
				if(i == j)
					this.m_matrix[i * this.m_size + j] = 1;
				else
					this.m_matrix[i * this.m_size + j] = 0;
			}
		}
	}

	transpose() {
		const copy_matrix = this.m_matrix.slice(0);
		for(let i=0;i<this.m_size;++i) {
			for(let j=0;j<this.m_size;++j) {
				this.m_matrix[i * this.m_size + j] = copy_matrix[j * this.m_size + i];
			}
		}
	}

	copy() {
		const new_matrix = new Matrix(this.m_matrix.slice(0), true);
		return new_matrix;
	}

	setCell(row, col, val) {
		if(row < this.m_size && col < this.m_size) {
			this.m_matrix[col * this.m_size + row] = val;
			return;
		}

		const exception = `[ERROR] matrix does not have a cell at [${row}, ${col}]`;
		throw new RangeError(exception);
	}

	getCell(row, col) {
		if(row < this.m_size && col < this.m_size)
			return this.m_matrix[col * this.m_size + row];

		const exception = `[ERROR] matrix does not have a value at [${row}, ${col}]`;
		throw new RangeError(exception);
	}

	getSize() {
		return this.m_size;
	}

	getRawMatrix() {
		return this.m_matrix;
	}
}

export default Matrix;
