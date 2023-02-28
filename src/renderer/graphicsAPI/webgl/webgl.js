import * as Shader from "./shader.js";
import * as Constants from "./../../../utils/constants.js";

class WebGL {
    constructor() {
    }

    /* @param { HTMLCanvasElement } */
    setup(_canvas) {
        const gl = _canvas.getContext("webgl2", {preserveDrawingBuffer: true});
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

    /* @param { Shader, VerticesContainer } */
    render(_shader, _verticesContainer) {
        const gl = Constants.RenderingContext.WebGL;

        _shader.setAllAttributes(_verticesContainer.getAllAttributes());
        _shader.setIndicesData(_verticesContainer.getIndicesBuffer());

        _shader.bind();
        gl.drawElements(
            gl.TRIANGLES,
            _verticesContainer.getIndicesBuffer().getCount(),
            gl.UNSIGNED_SHORT,
            0
        );
    }
}

export {
    WebGL,
    Shader
};
