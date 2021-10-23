import * as WebGL from "./graphicsAPI/webgl/webgl.js";
import * as WebGLShader from "./../shaders/webgl/shadercode.js";

class Renderer {
    /* @param {JSONObject} */
    constructor(settings) {
        this.settings = processRendererSettings(settings);

        const canvas = document.getElementById(settings.canvas);

        this.m_webgl = new WebGL.WebGL();
        if(!this.m_webgl.setup(canvas)) {
            //
        }
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