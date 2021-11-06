import * as Constants from "./constants.js";

function GetDrawCallCount() {
    const count = Constants.DrawCallCount;
    Constants.DrawCallCount = 0;

    return count;
}