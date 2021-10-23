import * as WebGL from "../../../utils/constants.js";

class Shader {
    constructor(gl, vertexCode, fragmentCode, attributes, uniforms) {
        this.m_gl = gl;

        this.m_vertexArray = null;
        this.m_attributeLocations = new Map();
        this.m_uniformLocations = new Map();

        this.m_program = this.$createProgram(vertexCode, fragmentCode);
        
        this.$setupAttributes(attributes);
        if(uniforms) this.$setupUniforms(uniforms);

        this.bind();
    }

    bind() {
        const gl = this.m_gl;

        gl.useProgram(this.m_program);
    }

    /* @param { String, Float32Array } */
    setAttributeData(attributeName, data) {
        const gl = this.m_gl;

        if(this.m_attributeLocations.has(attributeName)) {
            this.bind();
            const vbo = this.m_attributeLocations.get(attributeName);

            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
        } else {
            console.error(`[ERROR] Attribute "${attributeName}" Cannot Be Found!`);
        }
    }

    /* @param { string, Array|number} */
    setUniformData(name, data) {
        const gl = this.m_gl;

        if(this.m_uniformLocations.has(name)) {
            this.bind();

            const uniform = this.m_uniformLocations.get(name);
            const uniform_types = WebGL.WebGL.UniformTypes;

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

    /* @private */
    /* { name: string, size: number } */
    $setupAttributes(attributes) {
        const gl = this.m_gl;

        this.m_vertexArray = gl.createVertexArray();
        gl.bindVertexArray(this.m_vertexArray);

        for(const attribute of attributes) {
            const vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

            const attribute_location = gl.getAttribLocation(this.m_program, attribute.name);
            this.m_attributeLocations.set(attribute.name, vbo);

            gl.vertexAttribPointer(attribute_location,
                attribute.size,
                gl.FLOAT,
                gl.FALSE,
                attribute.size * Float32Array.BYTES_PER_ELEMENT,
                0
            );
            gl.enableVertexAttribArray(attribute_location);
        }
    }

    /* @param { name: string, type: WebGLUniformTypes} */
    $setupUniforms(uniforms) {
        const gl = this.m_gl;

        for(const uniform of uniforms) {
            const location = gl.getUniformLocation(this.m_program, uniform.name)
            this.m_uniformLocations.set(uniform.name, { location: location, type: uniform.type });
        }
    }

    $createProgram(vertexCode, fragmentCode) {
        const gl = this.m_gl;

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
        const gl = this.m_gl;

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
}