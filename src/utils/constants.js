const UniformTypes = {
    Integer: 0,
    Float: 1,
    Vector2: 2,
    Vector3: 3,
    Vector4: 4,
    Matrix4: 5,
    IntegerArray: 6
};
const MaxTextureSlot = 8;

let RenderingContext = {
    WebGL: null
};

let MaxVertexCount = 10000;

let DrawCallCount = 0;

export {
    UniformTypes,
    RenderingContext,
    DrawCallCount,
    MaxVertexCount
};