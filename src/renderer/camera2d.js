import * as math from "./../math/math.js";

class Camera2d {
    /* @param { number, number } */
    /* @param { number, number, number, number } */
    /* @param { number, number, number, number, number } */
    constructor(..._params) {
        this.m_camera = {
            x: 0,
            y: 0,
            width: 1,
            height: 1,
            near: 0,
            far: -1
        };
        if(_params.length == 2) {

            this.m_camera.width = _params[0];
            this.m_camera.height = _params[1];

        } else if(_params.length == 4) {

            this.m_camera.x = _params[0];
            this.m_camera.y = _params[1];
            this.m_camera.width = _params[2];
            this.m_camera.height = _params[3];

        } else if(_params.length == 5) {
            
            this.m_camera.x = _params[0];
            this.m_camera.y = _params[1];
            this.m_camera.width = _params[2];
            this.m_camera.height = _params[3];
            this.m_camera.far = _params[4];
        }
        this.m_cameraMatrix = null;
        this.createMatrix();
    }

    createMatrix() {
        const x = this.m_camera.x;
        const y = this.m_camera.y;
        const w = this.m_camera.width;
        const h = this.m_camera.height;
        
        this.m_cameraMatrix = math.getMatrix.projection2d(x - w / 2, x + w / 2, y - h / 2, y + h / 2, -1, 1);
    }

    /* @param { number, number } */
    translate(_x, _y) {
        this.m_camera.x += _x;
        this.m_camera.y += _y;
    }

    /* @param { number, number } */
    setPosition(_x, _y) {
        this.m_camera.x = _x;
        this.m_camera.y = _y;
    }

    /* @param { number, number } */
    resize(_w, _h) {
        this.m_camera.width = _w;
        this.m_camera.height = _h;
    }

    getMatrix() {
        return this.m_cameraMatrix;
    }
}

export default Camera2d;