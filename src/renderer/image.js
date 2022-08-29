import * as Constants from "../utils/constants.js";
import * as Methods from "../utils/methods.js";

/* not finished */
let counter = 0;

class Texture {
    constructor(source, properties, callback) {

        this.m_texture = null;
        this.properties = processProperties(properties);
        this.id = counter ++;

        if(typeof source == "string") {

            const image = new Image();
            image.onload = () => {
                this.properties.width = image.width;
                this.properties.height = image.height;

                const canvas = createCanvasImage(image);
                this.$createWebGLTexture(canvas);
                
                if(typeof callback == "function") callback();
            }
            image.src = source;
            image.setAttribute("crossOrigin", "");

        } else if(source instanceof Uint8Array) {
            this.properties.width = properties.width;
            this.properties.height = properties.height;
            
            const channels = 4;
            const pixel_count = source.length / channels;
            if(typeof this.properties.width != "number" || typeof this.properties.height != "number")
                throw new Methods.InvalidParameter("[ERROR] Texture missing a width and height property!");
            if(this.properties.width * this.properties.height != pixel_count)
                throw new RangeError("[ERROR] Cannot create texture due to an invalid number of pixels!");

            this.$createWebGLTexture(source);

        }
    }

    bind(textureSlot) {
        const gl = Constants.RenderingContext.WebGL;

        gl.bindTexture(gl.TEXTURE_2D, this.m_texture);
    }

    $createWebGLTexture(data) {
        const gl = Constants.RenderingContext.WebGL;

        this.m_texture = gl.createTexture();
        this.bind(0);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.properties.width, this.properties.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);

        const magnification_type = this.properties.smooth ? gl.LINEAR : gl.NEAREST;

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magnification_type);
    }
}

function createCanvasImage(image) {
    const canvas = document.createElement("canvas");

    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext("2d");
    ctx.scale(1, -1);
    ctx.drawImage(image, 0, -canvas.height);

    return canvas;
}

function processProperties(properties) {
    if(!properties)
        return null;
    
    const new_properties = {};

    /* image smoothing */
    if(typeof properties.smooth == "boolean")
        new_properties.smooth = properties.smooth;
    else
        new_properties.smooth = true;
    
    return new_properties;
}

/*
const someImage = new Texture(source); // string: url array: pixels
//
*/

export default Texture;