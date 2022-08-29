import * as math from "./../math/math.js";

class Camera2d {
    constructor(...params) {
        this.m_camera = {
            x: 0,
            y: 0,
            width: 1,
            height: 1,
            near: 0,
            far: -1
        };
        if(params.length == 2) {

            this.m_camera.width = params[0];
            this.m_camera.height = params[1];

        } else if(params.length == 4) {

            this.m_camera.x = params[0];
            this.m_camera.y = params[1];
            this.m_camera.width = params[2];
            this.m_camera.height = params[3];

        } else if(params.length == 5) {
            
            this.m_camera.x = params[0];
            this.m_camera.y = params[1];
            this.m_camera.width = params[2];
            this.m_camera.height = params[3];
            this.m_camera.far = params[4];
        }
        this.m_cameraMatrix = null;
        this.createMatrix();
    }

    createMatrix() {
        const x = this.m_camera.x;
        const y = this.m_camera.y;
        const w = this.m_camera.width;
        const h = this.m_camera.height;
        
        this.m_cameraMatrix = math.projection2d(x - w / 2, x + w / 2, y - h / 2, y + h / 2, -1, 1);
    }

    translate(x, y) {
        this.m_camera.x += x;
        this.m_camera.y += y;
    }

    setPosition(x, y) {
        this.m_camera.x = x;
        this.m_camera.y = y;
    }

    resize(w, h) {
        this.m_camera.width = w;
        this.m_camera.height = h;
    }

    getMatrix() {
        return this.m_cameraMatrix;
    }
}

export default Camera2d;