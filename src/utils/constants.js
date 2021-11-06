const WebGL = {
    UniformTypes: {
        Integer: 0,
        Float: 1,
        Vector2: 2,
        Vector3: 3,
        Vector4: 4,
        Matrix4: 5,
        IntegerArray: 6
    }
};

let RenderingContext = {
    WebGL: null
};

let DrawCallCount = 0;

export {
    WebGL,
    RenderingContext,
    DrawCallCount
};