import * as Constants from "./constants.js";

class InvalidParameter extends Error {
    constructor(message) {
        super(message);
    }
}

function GetDrawCallCount() {
    const count = Constants.DrawCallCount;
    Constants.DrawCallCount = 0;

    return count;
}

export {
    InvalidParameter,
    GetDrawCallCount
};