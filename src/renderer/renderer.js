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
        this.m_verticesContainer = new VerticesContainer(Constants.MAX_ATTRIBUTES, Constants.MAX_INDICES);
        this.m_verticesContainer.setShader(this.m_shader);

        // setup useful variables
        this.webgl = Constants.RenderingContext.WebGL;
        this.maxTextureSlots = this.webgl.getParameter(this.webgl.MAX_TEXTURE_IMAGE_UNITS);

        // setup the tracker to ensure draw calls are made when resources are changed
        this.m_textureTracker = new Uint8Array(this.maxTextureSlots);

        // setup drawing options
        this.m_defaultDrawingOptions = undefined;
        this.$createDefaultDrawingOptions();

        // create a list of methods that the user can call
        this.draw = {
            rect: (x, y, w, h, options) => { this.drawImage(this.m_whiteImage, x, y, w, h, options); },
            image: (image, x, y, w, h, options) => { this.drawImage(image, x, y, w, h, options); }
        }
    }

    setDefaultOption(_options) {
        this.m_defaultDrawingOptions = this.$getFinalDrawingOption(this.m_defaultDrawingOptions, _options);
    }

    drawImage(image, x, y, w, h, options) {
        const obj_option = this.$getFinalDrawingOption(this.m_defaultDrawingOptions, options);

        // swap texture
        if(this.m_textureTracker[0] != image.id) {
            this.makeDrawCall();
            image.bind(0);
            this.m_textureTracker[0] = image.id;
        }

        // calculate position based on alignment
        const get_align = obj_option.align.split(" ");
        let position = { x: x, y: y };
        switch(get_align[0]) {
            case "center":
                position.y -= h / 2.0;
                break;
            case "bottom":
                position.y -= h;
                break;
        }
        switch(get_align[1]) {
            case "center":
                position.x -= w / 2.0;
                break;
            case "right":
                position.x += w;
                break;
        }

        const vertices = [
            {
                a_position: [position.x, position.y],
                a_color: obj_option.color,
                a_texCoord: [0, 1]
            },
            {
                a_position: [position.x+w, position.y],
                a_color: obj_option.color,
                a_texCoord: [1, 1]
            },
            {
                a_position: [position.x+w, position.y+h],
                a_color: obj_option.color,
                a_texCoord: [1, 0]
            },
            {
                a_position: [position.x, position.y+h],
                a_color: obj_option.color,
                a_texCoord: [0, 0]
            }
        ];

        this.$renderShape(vertices);
    }

    makeDrawCall() {
        if(this.m_verticesContainer.empty())
            return;

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
                {name: "a_texCoord", size: 2}
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

    $createDefaultDrawingOptions() {
        this.m_defaultDrawingOptions = {
            align: "top left",
            color: [ 255, 255, 255, 255 ]
        };
    }

    $getFinalDrawingOption(_defaultOption, _overrideOption) {
        const new_option = _defaultOption;
        if(_overrideOption == undefined)
            return new_option;

        for(const each_option in new_option) {
            // continue if no override is defined
            if(typeof(_overrideOption[each_option]) != typeof(_defaultOption[each_option]))
                continue;
            
            // override
            const option_type = typeof(_overrideOption[each_option]);
            if(option_type != "object") {
                new_option[each_option] = _overrideOption[each_option];
                continue;
            }

            // objects do not have to have all parts specified
            for(const option_part in _overrideOption[each_option]) {
                if(new_option[each_option][option_part] == undefined)
                    continue;
                new_option[each_option][option_part] = _overrideOption[each_option][option_part];
            }
        }

        return new_option;
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