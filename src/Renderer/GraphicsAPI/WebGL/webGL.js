import * as Shader from "./Shader.js"
import * as Constants from "./../../../Constants/Constants.js"

const vertexCode = `
    precision mediump float;
    attribute vec2 vertPosition;

    uniform vec4 color;
    
    varying vec4 v_color;

    void main()
    {
        gl_Position = vec4(vertPosition, 0.0, 1.0);
        v_color = color;
    }
`;
const fragmentCode = `
    precision mediump float;

    varying vec4 v_color;

    void main()
    {
        gl_FragColor = v_color;
    }
`;

class WebGL {
    constructor() {
    }

    /* @param { HTMLCanvasElement } */
    setup(canvas) {
        this.m_gl = canvas.getContext("webgl2");
        const gl = this.m_gl;

        if(!gl) {
            return false;
        }

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const shader = new Shader.Shader(gl, vertexCode, fragmentCode,
            [{name: "vertPosition", size: 2}],
            [{name: "color", type: Constants.WebGL.UniformTypes.Vector4}]
        );

        const vertices = [
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ];

        shader.setAttributeData("vertPosition", new Float32Array(vertices));
        shader.setUniformData("color", [0.85, 0.8, 0.3, 1]);

        gl.useProgram(shader.m_program);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        return true;
    }

    drawShape(vertices) {
        //
    }

    createShaderProgram(shaderCode, type) {
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
    WebGL
}