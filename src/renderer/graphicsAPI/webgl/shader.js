import * as WebGL from "./../../../utils/constants.js";
import * as Constants from "./../../../utils/constants.js";

class Shader {
    /* @param { string, string, attributes[], uniforms[] } */
    /* attributes [{ name: string, size: number }] */
    /* uniforms [{ name: string, type: UniformTypes }] */
    constructor(_vertexCode, _fragmentCode, _attributes, _uniforms) {

        this.m_indexBuffer = null;
        this.m_vertexArray = null;
        this.m_attributeDetails = new Map();
        this.m_uniformLocations = new Map();

        this.m_program = createProgram(_vertexCode, _fragmentCode);
        
        this.$setupAttributes(_attributes);
        if(_uniforms) this.$setupUniforms(_uniforms);
        this.$setupIndexBuffer();

        this.bind();
    }

    getAttributesList() {
        const result = new Array(this.m_attributeDetails.size);
        let counter = 0;
        for(const attribute of this.m_attributeDetails.keys()) {
            const attribute_details = this.m_attributeDetails.get(attribute);
            result[counter] = {
                name: attribute,
                size: attribute_details.size,
                offset: attribute_details.offset
            };

            ++ counter;
        }

        return result;
    }

    bind() {
        const gl = Constants.RenderingContext.WebGL;

        gl.useProgram(this.m_program);
    }

    /* @param { String, Float32Array } */
    setAttributeData(_attributeName, _data) {
        const gl = Constants.RenderingContext.WebGL;

        if(this.m_attributeDetails.has(_attributeName)) {
            this.bind();
            const vbo = this.m_attributeDetails.get(_attributeName).bufferObject;

            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, _data, gl.DYNAMIC_DRAW);
        } else {
            console.error(`[ERROR] Attribute "${_attributeName}" Cannot Be Found!`);
        }
    }

    /* @param { VerticesContainer } */
    setAllAttributes(_attributes) {
        for(const attribute of _attributes.getAttribList())
            this.setAttributeData(attribute, _attributes);
    }

    /* @param { string, Array|number } */
    setUniformData(_name, _data) {
        const gl = Constants.RenderingContext.WebGL;

        if(this.m_uniformLocations.has(_name)) {
            this.bind();

            const uniform = this.m_uniformLocations.get(_name);
            const uniform_types = WebGL.UniformTypes;

            switch(uniform.type) {
                case uniform_types.Integer:
                    gl.uniform1i(uniform.location, _data);
                    break;
                case uniform_types.Float:
                    gl.uniform1f(uniform.location, _data);
                    break;
                case uniform_types.Vector2:
                    gl.uniform2f(uniform.location, ..._data);
                    break;
                case uniform_types.Vector3:
                    gl.uniform3f(uniform.location, ..._data);
                    break;
                case uniform_types.Vector4:
                    gl.uniform4f(uniform.location, ..._data);
                    break;
                case uniform_types.Matrix4:
                    gl.uniformMatrix4fv(uniform.location, gl.FALSE, _data);
                    break;
                case uniform_types.IntegerArray:
                    gl.uniform1iv(uniform.location, _data);
                    break;
            }
        }
    }

    /* @param { Array } */
    setIndicesData(_data) {
        const gl = Constants.RenderingContext.WebGL;

        this.bind();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(_data), gl.DYNAMIC_DRAW);
    }

    /* @private */
    $setupIndexBuffer() {
        const gl = Constants.RenderingContext.WebGL;

        this.m_indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_indexBuffer);
    }

    /* { name: string, size: number } */
    $setupAttributes(_attributes) {
        const gl = Constants.RenderingContext.WebGL;

        this.m_vertexArray = gl.createVertexArray();
        gl.bindVertexArray(this.m_vertexArray);

        let vertex_size = 0;
        for(const attribute of _attributes)
            vertex_size += attribute.size;

        let offset_counter = 0;
        for(const attribute of _attributes) {
            const vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

            const attribute_location = gl.getAttribLocation(this.m_program, attribute.name);
            this.m_attributeDetails.set(attribute.name, {size: attribute.size, bufferObject: vbo, offset: offset_counter});

            gl.vertexAttribPointer(attribute_location,
                attribute.size,
                gl.FLOAT,
                gl.FALSE,
                vertex_size * Float32Array.BYTES_PER_ELEMENT,
                offset_counter * Float32Array.BYTES_PER_ELEMENT
            );
            gl.enableVertexAttribArray(attribute_location);

            offset_counter += attribute.size;
        }
    }

    /* @param { name: string, type: WebGLUniformTypes } */
    $setupUniforms(_uniforms) {
        const gl = Constants.RenderingContext.WebGL;

        for(const uniform of _uniforms) {
            const location = gl.getUniformLocation(this.m_program, uniform.name)
            this.m_uniformLocations.set(uniform.name, { location: location, type: uniform.type });
        }
    }
}

/* @param { string, string } */
function createProgram(_vertexCode, _fragmentCode) {
    const gl = Constants.RenderingContext.WebGL;

    const vertex_shader = createShaderProgram(_vertexCode, gl.VERTEX_SHADER);
    const fragment_shader = createShaderProgram(_fragmentCode, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();

    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`ERROR linking program! ${gl.getProgramInfoLog(program)}`);
    }

    //expensive :(
    gl.validateProgram(program);
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error(`ERROR validating program! ${gl.getProgramInfoLog(program)}`);
    }

    return program;
}

/* @param { string, gl_shader_type } */
function createShaderProgram(_shaderCode, _type) {
    const gl = Constants.RenderingContext.WebGL;

    const shader = gl.createShader(_type);
    gl.shaderSource(shader, _shaderCode);

    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`ERROR compiling shader! ${gl.getShaderInfoLog(shader)}`);
    }

    return shader;
}

export {
    Shader
};