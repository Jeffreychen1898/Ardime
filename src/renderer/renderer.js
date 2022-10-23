import * as Constants from "../utils/constants.js";

import * as WebGL from "./graphicsAPI/webgl/webgl.js";
import shaders from "./graphicsAPI/webgl/shadercode.js";
import { VerticesContainer } from "./verticesContainer.js";
import Camera2d from "./camera2d.js";
import Texture from "./image.js";

class Renderer {
    /* @param {JSONObject} */
    constructor(settings) {
        this.m_shader = null;
        this.m_defaultCamera = new Camera2d();
        this.m_whiteImage = null;

        this.settings = processRendererSettings(settings);

        this.m_webgl = new WebGL.WebGL();
        if(!this.m_webgl.setup(this.settings.canvas))
            console.error("webgl not supported!");

        // setup the defaults
        this.$createShaders();
        this.$setupCamera(0, 0, this.settings.canvas.width, this.settings.canvas.height);
        this.$createDefaultImage();

        // create the vertices container
        this.m_verticesContainer = new VerticesContainer(Constants.MaxVertexCount, 10000);
        this.m_verticesContainer.setShader(this.m_shader);

        // create a list of methods that the user can call
        this.draw = {
            rect: (x, y, w, h) => { this.drawImage(this.m_whiteImage, x, y, w, h); },
            image: (image, x, y, w, h) => { this.drawImage(image, x, y, w, h); }
        }
    }

    drawImage(image, x, y, w, h) {
        image.bind(0);
        const vertices = [
            {
                a_position: [x, y],
                a_color: [1, 1, 1, 1],
                a_texCoord: [0, 1]
            },
            {
                a_position: [x+w, y],
                a_color: [1, 1, 0, 1],
                a_texCoord: [1, 1]
            },
            {
                a_position: [x+w, y+h],
                a_color: [1, 0, 1, 1],
                a_texCoord: [1, 0]
            },
            {
                a_position: [x, y+h],
                a_color: [0, 1, 1, 1],
                a_texCoord: [0, 0]
            }
        ]

        this.$renderShape(vertices);
    }

    makeDrawCall() {
        this.m_webgl.render(this.m_shader, this.m_verticesContainer);
        this.m_verticesContainer.clear();
    }

    $renderShape(vertices) {
        if(!this.m_verticesContainer.appendShape(vertices)) { // flush if full
            this.makeDrawCall();
            this.m_verticesContainer.appendShape(vertices);
        }
    }

    $createShaders() {
        this.m_shader = new WebGL.Shader.Shader(shaders.rect.vertex, shaders.rect.fragment,
            [
                {name: "a_position", size: 2},
                {name: "a_color", size: 4},
                //{name: "a_texCoord", size: 2}
            ],
            [
                {name: "u_projection", type: Constants.UniformTypes.Matrix4},
                {name: "u_texture", type: Constants.UniformTypes.Integer}
            ]
        );

        this.m_shader.setUniformData("u_texture", 0);
    }

    $createDefaultImage() {
        const properties = {
            width: 1,
            height: 1
        };
        const pixel_array = new Uint8Array([255, 255, 255, 255]);
        this.m_whiteImage = new Texture(pixel_array, properties);
        this.m_whiteImage.bind(0);
    }

    $setupCamera(x, y, w, h) {
        this.m_defaultCamera.setPosition(x, y);
        this.m_defaultCamera.resize(w, h);
        this.m_defaultCamera.createMatrix();
        this.m_shader.setUniformData("u_projection", this.m_defaultCamera.getMatrix().getRawMatrix());
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