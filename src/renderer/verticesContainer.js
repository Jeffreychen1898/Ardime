import * as Constants from "./../utils/constants.js";

class VerticesContainer {
    /* @param {Integer} */
    constructor(maxVertices, maxIndices) {
        this.m_maxVertices = maxVertices;
        this.m_maxIndices = maxIndices;

        this.m_attributes = new Map();
        this.m_indexBuffer = new IndicesArray(maxIndices);

        this.m_attributesArr = new AttributeArray(50000);
    }

    /* @param {Shader} */
    newShader(shader) {
        /* [{name: string, size: number}] */
        const attributes = shader.getAttributesList();

        this.m_attributes.clear();
        for(const attribute of attributes) {
            const attributes_list = new AttributesArray(this.m_maxVertices * attribute.size, attribute.size);
            this.m_attributes.set(attribute.name, attributes_list);
        }
    }

    /* @param {Shader} */
    setShader(shader) {
        const attributes = shader.getAttributesList();
        this.m_attributesArr.clear();
        this.m_attributesArr.resetAttribDetails();

        for(const attrib of attributes)
            this.m_attributesArr.setAttribDetails(attrib.name, attrib.offset, attrib.size);
    }

    /* @param{RenderingAPI} */
    clear() {
        this.m_attributesArr.clear();
        this.m_attributes = new Map();
        this.m_indexBuffer = new IndicesArray(this.m_maxIndices);
    }

    /* @param {Shape} */
    /*validateShape(shape) {
        //may be removed in the near future as we may need to draw lines and points
        if(shape.length < 3)
            return false;
        
        for(const vertex of shape) {
            for(const key of this.m_attributes.keys()) {

                if(!vertex[key])
                    return false;

            }
        }

        return true;
    }*/

    appendShape(_shape) {
        // check if the containers have enough space
        if(!this.m_indexBuffer.validateSize(_shape.length))
            return false;
        if(!this.m_attributesArr.validateSize(_shape.length))
            return false;
        
        // add the attributes
        for(const vertex of _shape) {
            const success = this.m_attributesArr.insert(vertex);
            if(!success)
                throw new Error("Invalid data");
        }

        //add index buffer
        let indices_counter = 0;
        const indices = new Uint16Array(3 * _shape.length - 6);
        for(let i=2;i<_shape.length;i++) {
            indices[indices_counter    ] = 0;
            indices[indices_counter + 1] = i - 1;
            indices[indices_counter + 2] = i;

            indices_counter += 3;
        }
        this.m_indexBuffer.insert(indices, _shape.length);

        return true;
    }

    /* @param {Shape, renderingAPI} */
    /*add(shape) {
        //check if out of bounds
        if(!this.m_indexBuffer.validateSize(shape.length))
            return false;

        // validate size
        for(const vertex of shape) {
            for(const key of this.m_attributes.keys()) {
                if(!this.m_attributes.get(key).validateSize(vertex[key].length))
                    return false;
            }
        }

        // add attributes
        for(const vertex of shape) {
            for(const key of this.m_attributes.keys()) {
                this.m_attributes.get(key).insert(vertex[key]);
            }
        }

        //add index buffer
        let indices_counter = 0;
        const indices = new Uint16Array(3 * shape.length - 6);
        for(let i=2;i<shape.length;i++) {
            indices[indices_counter    ] = 0;
            indices[indices_counter + 1] = i - 1;
            indices[indices_counter + 2] = i;
            
            indices_counter += 3;
        }
        this.m_indexBuffer.insert(indices, shape.length);

        return true;
    }*/

    getAllAttributes() {
        /*const result = new Array(this.m_attributes.size);
        let counter = 0;
        for(const key of this.m_attributes.keys()) {
            result[counter] = {
                name: key,
                data: this.m_attributes.get(key)
            };

            ++ counter;
        }

        return result;*/
        return this.m_attributesArr;
    }

    getIndicesBuffer() {
        return this.m_indexBuffer;
    }
}

class IndicesArray extends Uint16Array {
    constructor(size) {
        super(size);
        this.m_counter = 0;
        this.m_totalVertexCount = 0;
    }

    insert(data, vertexCount) {
        if(this.m_counter + data.length > super.length)
            return false;
        
        const modified_data = [...data];
        for(const i in modified_data) {
            modified_data[i] = modified_data[i] + this.m_totalVertexCount;
        }

        super.set(modified_data, this.m_counter);
        this.m_counter += data.length;

        this.m_totalVertexCount += vertexCount;

        return true;
    }

    validateSize(numOfVertices) {
        const required_size = 3 * numOfVertices - 6;
        const total_vertex_count = this.m_totalVertexCount + numOfVertices;
        
        return this.m_counter + required_size <= super.length && total_vertex_count < 0xFFFF;
    }

    getCount() {
        return this.m_counter;
    }
}

class AttributeArray extends Float32Array {
    constructor(size) {
        super(size);
        this.m_contentSize = 0;
        this.m_attribDetails = new Map();
        this.m_vertexLength = 0;
    }

    clear() {
        this.m_contentSize = 0;
    }

    resetAttribDetails() {
        this.m_vertexLength = 0;
        this.m_attribDetails.clear();
    }

    setAttribDetails(_name, _offset, _size) {
        // input format: {name: string, offset: number, size: number}
        this.m_attribDetails.set(_name, { offset: _offset, size: _size });
        this.m_vertexLength += _size;
    }

    insert(_vertexData) {
        // validate the vertex data
        for(const key of this.m_attribDetails.keys()) {
            if(_vertexData[key] == undefined)
                return false;
        }

        // store the data
        for(const key of this.m_attribDetails.keys()) {
            const attribute_detail = this.m_attribDetails.get(key);
            super.set(_vertexData[key], this.m_contentSize + attribute_detail.offset);
        }
        this.m_contentSize += this.m_vertexLength;

        return true;
    }

    validateSize(_vertexCount) {
        return this.m_contentSize + _vertexCount * this.m_vertexLength < super.length;
    }

    getAttribDetail(_name) {
        return this.m_attribDetails.get(_name);
    }

    getAttribList() {
        return this.m_attribDetails.keys();
    }
}

class AttributesArray extends Float32Array {
    constructor(size, attributeSize) {
        super(size);
        this.m_counter = 0;
        this.attributeSize = attributeSize;
    }

    insert(data) {
        if(this.m_counter + data.length > super.length)
            return false;
        
        super.set(data, this.m_counter);
        this.m_counter += data.length;

        return true;
    }

    validateSize(size) {
        return this.m_counter + size <= super.length
    }

    getCount() {
        return this.m_counter;
    }
}

/*
Shape = [
    {
        property1: [attributes],
        property2: [attributes]
    },
    ...
]
*/

export {
    VerticesContainer
};