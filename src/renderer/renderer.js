import * as Constants from "../utils/constants.js";
import * as Methods from "../utils/methods.js";

import * as WebGL from "./graphicsAPI/webgl/webgl.js";
import shaders from "./graphicsAPI/webgl/shadercode.js";
import { VerticesContainer } from "./verticesContainer.js";
import Camera2d from "./camera2d.js";
import Texture from "./image.js";

class Renderer {
    /* @param { settings{} } */
    /* settings { canvas: string, width: number, height: number } */
    constructor(_settings) {
        this.m_shader = null;
        this.m_defaultCamera = new Camera2d();
        this.m_whiteImage = null;

        this.settings = processRendererSettings(_settings);

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
            rect: (_x, _y, _w, _h, _options) => { this.drawImage(this.m_whiteImage, _x, _y, _w, _h, _options); },
            image: (_image, _x, _y, _w, _h, _options) => { this.drawImage(_image, _x, _y, _w, _h, _options); },
            shape: {
                new: () => { this.newShape(); },
                vertex: (_shape, _attributes, _differentShader) => { this.createVertex(_shape, _attributes, _differentShader); },
                draw: (_shape) => { this.drawShape(_shape); }
            },
            bind: {
                texture: (_texture, _slot) => { this.bindTexture(_texture, _slot); }
            }
        }
    }

    /* @param { options{} } */
    /* options { align: string, color: Array } */
    setDefaultOption(_options) {
        this.m_defaultDrawingOptions = Methods.processOptions(this.m_defaultDrawingOptions, _options);
    }

    /* @param { Texture, number, number, number, number, options{} } */
    /* options { align: string, color: Array } */
    drawImage(_image, _x, _y, _w, _h, _options) {
        const obj_option = Methods.processOptions(this.m_defaultDrawingOptions, _options);

        this.bindTexture(_image, 0);

        // calculate position based on alignment
        const get_align = obj_option.align.split(" ");
        let position = { x: _x, y: _y };
        switch(get_align[0]) {
            case "center":
                position.y -= _h / 2.0;
                break;
            case "bottom":
                position.y -= _h;
                break;
        }
        switch(get_align[1]) {
            case "center":
                position.x -= _w / 2.0;
                break;
            case "right":
                position.x += _w;
                break;
        }

        const new_shape = this.newShape();

        this.createVertex(new_shape, { position: [position.x, position.y], color: obj_option.color, texCoord: [0, 1]});
        this.createVertex(new_shape, { position: [position.x+_w, position.y], color: obj_option.color, texCoord: [1, 1]});
        this.createVertex(new_shape, { position: [position.x+_w, position.y+_h], color: obj_option.color, texCoord: [1, 0]});
        this.createVertex(new_shape, { position: [position.x, position.y+_h], color: obj_option.color, texCoord: [0, 0]});

        this.drawShape(new_shape);
    }

    bindTexture(_image, _slot) {
        if(this.m_textureTracker[_slot] != _image.id) {
            this.makeDrawCall();
            _image.bind(_slot);
            this.m_textureTracker[_slot] = _image.id;
        }
    }

    newShape() {
        return [];
    }

    /* @param { Array, attributes{}, boolean } */
    /* attributes { *attribute*: *value* } */
    /* attributes { position: Array, color: Array, texCoord: Array} */
    createVertex(_shape, _attributes, _differentShader) {
        if(_differentShader) {
            _shape.push(_attributes);
            return;
        }

        const default_values = {
            position: [0, 0],
            color: [255, 255, 255, 255],
            texCoord: [0, 0]
        };
        const shape_attributes = Methods.processOptions(default_values, _attributes);
        _shape.push({
            a_position: shape_attributes.position,
            a_color: shape_attributes.color,
            a_texCoord: shape_attributes.texCoord
        });
    }

    /* @param { vertices[] } */
    /* vertices [{ *attribute*: *data* }] */
    drawShape(_shape) {
        if(!this.m_verticesContainer.appendShape(_shape)) { // flush if full
            this.makeDrawCall();
            this.m_verticesContainer.appendShape(_shape);
        }
    }

    makeDrawCall() {
        if(this.m_verticesContainer.empty())
            return;

        this.m_webgl.render(this.m_shader, this.m_verticesContainer);
        this.m_verticesContainer.clear();
    }

    /* initialization functions */
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

    /* @param { number, number, number, number } */
    $setupCamera(_x, _y, _w, _h) {
        this.m_defaultCamera.setPosition(_x, _y);
        this.m_defaultCamera.resize(_w, _h);
        this.m_defaultCamera.createMatrix();
        this.m_shader.setUniformData("u_projection", this.m_defaultCamera.getMatrix().getRawMatrix());
    }
}

/* @param { settings{} } */
/* settings { canvas: string, width: number, height: number } */
function processRendererSettings(_settings) {
    if(typeof(_settings) != "object") {
        return { error: true, message: "[ERROR] Renderer settings must be a JSON Object!" };
    }

    // process the settings
    const default_setting = {
        canvas: null,
        width: 100,
        height: 100
    };
    let processed_settings = Methods.processOptions(default_setting, _settings);

    // grab the canvas
    if(processed_settings.canvas == null)
        return { error: true, message: "[ERROR] Renderer settings is missing canvas id!" };
    else
        processed_settings.canvas = document.getElementById(processed_settings.canvas);

    return processed_settings;
}

export {
    Renderer
};