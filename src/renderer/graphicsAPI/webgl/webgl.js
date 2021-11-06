import * as Shader from "./shader.js";
import * as Constants from "./../../../utils/constants.js";
import shaders from "./../../../shaders/webgl/shadercode.js"

class WebGL {
    constructor() {
    }

    /* @param { HTMLCanvasElement } */
    setup(canvas) {
        const gl = canvas.getContext("webgl2");
        Constants.RenderingContext.WebGL = gl;

        if(!gl) {
            return false;
        }

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        return true;
    }

    renderShape(shader) {
        const gl = Constants.RenderingContext.WebGL;

        gl.useProgram(shader.m_program);
        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
    }

    createShaderProgram(shaderCode, type) {
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
    WebGL,
    Shader
};