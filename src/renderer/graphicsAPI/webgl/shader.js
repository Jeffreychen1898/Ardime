import * as WebGL from "./../../../utils/constants.js";
import * as Constants from "./../../../utils/constants.js";

class Shader {
    constructor(vertexCode, fragmentCode, attributes, uniforms) {

        this.m_indexBuffer = null;
        this.m_vertexArray = null;
        this.m_attributeDetails = new Map();
        this.m_uniformLocations = new Map();

        this.m_program = this.$createProgram(vertexCode, fragmentCode);
        
        this.$setupAttributes(attributes);
        if(uniforms) this.$setupUniforms(uniforms);
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
    setAttributeData(attributeName, data) {
        console.log(data);
        const gl = Constants.RenderingContext.WebGL;

        if(this.m_attributeDetails.has(attributeName)) {
            this.bind();
            const vbo = this.m_attributeDetails.get(attributeName).bufferObject;

            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
        } else {
            console.error(`[ERROR] Attribute "${attributeName}" Cannot Be Found!`);
        }
    }

    /* @param {VerticesContainer} */
    setAllAttributes(attributes) {
        for(const attribute of attributes.getAttribList())
            this.setAttributeData(attribute, attributes);
    }

    /* @param { string, Array|number} */
    setUniformData(name, data) {
        const gl = Constants.RenderingContext.WebGL;

        if(this.m_uniformLocations.has(name)) {
            this.bind();

            const uniform = this.m_uniformLocations.get(name);
            const uniform_types = WebGL.UniformTypes;

            switch(uniform.type) {
                case uniform_types.Integer:
                    gl.uniform1i(uniform.location, data);
                    break;
                case uniform_types.Float:
                    gl.uniform1f(uniform.location, data);
                    break;
                case uniform_types.Vector2:
                    gl.uniform2f(uniform.location, ...data);
                    break;
                case uniform_types.Vector3:
                    gl.uniform3f(uniform.location, ...data);
                    break;
                case uniform_types.Vector4:
                    gl.uniform4f(uniform.location, ...data);
                    break;
                case uniform_types.Matrix4:
                    gl.uniformMatrix4fv(uniform.location, gl.FALSE, data);
                    break;
                case uniform_types.IntegerArray:
                    gl.uniform1iv(uniform.location, data);
                    break;
            }
        }
    }

    /* @param {Array} */
    setIndicesData(data) {
        const gl = Constants.RenderingContext.WebGL;

        this.bind();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_indexBuffer);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.DYNAMIC_DRAW);
    }

    /* @private */
    $setupIndexBuffer() {
        const gl = Constants.RenderingContext.WebGL;

        this.m_indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_indexBuffer);
    }

    /* { name: string, size: number } */
    $setupAttributes(attributes) {
        const gl = Constants.RenderingContext.WebGL;

        this.m_vertexArray = gl.createVertexArray();
        gl.bindVertexArray(this.m_vertexArray);

        let offset_counter = 0;
        for(const attribute of attributes) {
            const vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

            const attribute_location = gl.getAttribLocation(this.m_program, attribute.name);
            this.m_attributeDetails.set(attribute.name, {size: attribute.size, bufferObject: vbo, offset: offset_counter});

            gl.vertexAttribPointer(attribute_location,
                attribute.size,
                gl.FLOAT,
                gl.FALSE,
                attribute.size * Float32Array.BYTES_PER_ELEMENT,
                offset_counter * Float32Array.BYTES_PER_ELEMENT
            );
            gl.enableVertexAttribArray(attribute_location);

            offset_counter += attribute.size;
        }
    }

    /* @param { name: string, type: WebGLUniformTypes} */
    $setupUniforms(uniforms) {
        const gl = Constants.RenderingContext.WebGL;

        for(const uniform of uniforms) {
            const location = gl.getUniformLocation(this.m_program, uniform.name)
            this.m_uniformLocations.set(uniform.name, { location: location, type: uniform.type });
        }
    }

    $createProgram(vertexCode, fragmentCode) {
        const gl = Constants.RenderingContext.WebGL;

        const vertex_shader = this.$createShaderProgram(vertexCode, gl.VERTEX_SHADER);
        const fragment_shader = this.$createShaderProgram(fragmentCode, gl.FRAGMENT_SHADER);

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

    /* @private */
    $createShaderProgram(shaderCode, type) {
        const gl = Constants.RenderingContext.WebGL;

        const shader = gl.createShader(type);
        gl.shaderSource(shader, shaderCode);

        gl.compileShader(shader);
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`ERROR compiling shader! ${gl.getShaderInfoLog(shader)}`);
        }

        return shader;
    }
}

export {
    Shader
};