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
const MAX_ATTRIBUTES = 50_000;
const MAX_INDICES = 10_000;

let RenderingContext = {
    WebGL: null
};

let DrawCallCount = 0;

export {
    UniformTypes,
    RenderingContext,
    DrawCallCount,
    MAX_ATTRIBUTES,
    MAX_INDICES
};