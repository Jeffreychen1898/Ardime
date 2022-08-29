import * as Shader from "./shader.js";
import * as Constants from "./../../../utils/constants.js";

class WebGL {
    constructor() {
    }

    /* @param { HTMLCanvasElement } */
    setup(canvas) {
        const gl = canvas.getContext("webgl2", {preserveDrawingBuffer: true});
        Constants.RenderingContext.WebGL = gl;

        if(!gl) {
            return false;
        }

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        return true;
    }

    /* @param {Shader, VerticesContainer} */
    render(shader, verticesContainer) {
        const gl = Constants.RenderingContext.WebGL;

        shader.setAllAttributes(verticesContainer.getAllAttributes());
        shader.setIndicesData(verticesContainer.getIndicesBuffer());

        shader.bind();
        gl.drawElements(
            gl.TRIANGLES,
            verticesContainer.getIndicesBuffer().getCount(),
            gl.UNSIGNED_SHORT,
            0
        );
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