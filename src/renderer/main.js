import * as Constants from "./../utils/constants.js";

import * as WebGL from "./graphicsAPI/webgl/webgl.js";
import shaders from "./graphicsAPI/webgl/shadercode.js";
import { VerticesContainer } from "./verticesContainer.js";

class Renderer {
    /* @param {JSONObject} */
    constructor(settings) {
        this.settings = processRendererSettings(settings);

        const canvas = document.getElementById(settings.canvas);

        this.m_webgl = new WebGL.WebGL();
        if(!this.m_webgl.setup(canvas)) {
            //
        }

        const shader = new WebGL.Shader.Shader(shaders.rect.vertex, shaders.rect.fragment,
            [{name: "vertPosition", size: 2}],
            [{name: "color", type: Constants.WebGL.UniformTypes.Vector4}]
        );

        this.m_indicesData = [];
        shader.setIndicesData([0, 1, 2]);

        const vertices = [
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ];

        shader.setAttributeData("vertPosition", new Float32Array(vertices));
        shader.setUniformData("color", [0.85, 0.8, 0.3, 1]);

        this.m_webgl.renderShape(shader);

        this.m_verticesContainer = new VerticesContainer(Constants.MaxVertexCount);
    }

    renderShape(vertices) {
        if(!this.m_verticesContainer.append(vertices)) {
            //render the object
            this.makeDrawCall();

            this.m_verticesContainer.append(vertices);
        }
    }

    drawRectangles(x, y, w, h) {
        const vertices = [
            {index: 0, data: [x, y]},
            {index: 0, data: [x+w, y]},
            {index: 0, data: [x+w. y+h]},
            {index: 0, data: [x, y+h]}
        ];

        this.renderShape(vertices);
    }

    makeDrawCall() {
        shader.setAttributeData("vertPosition", new Float32Array(this.m_verticesContainer.getVertexData(0)));
    }
}

/*
canvas: name of the canvas you would like to draw on
width: width of the canvas
height: height of the canvas
*/
/* @param {JSONObject} */
function processRendererSettings(settings) {
    if(typeof(settings) != "object") {
        return { error: true, message: "[ERROR] Renderer settings must be a JSON Object!" };
    }

    let processed_settings = {};

    //canvas
    if(typeof(settings.canvas) == "string") {
        processed_settings.canvas = document.getElementById(settings.canvas);
    } else {
        return { error: true, message: "[ERROR] Renderer settings is missing canvas id!" };
    }

    //width
    if(typeof(settings.width) == "number") {
        processed_settings.width = settings.width;
    } else {
        processed_settings.width = processed_settings.canvas.width || 100;
    }

    //height
    if(typeof(settings.height) == "number") {
        processed_settings.height = settings.height;
    } else {
        processed_settings.height = processed_settings.canvas.height || 100;
    }

    return processed_settings;
}

export {
    Renderer
};