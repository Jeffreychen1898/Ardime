import {Renderer} from "./renderer/renderer.js";
import Image from "./renderer/image.js";
import Performance from "./utils/performance.js";
import * as Constants from "./utils/constants.js";
import * as Transformation from "./geometry/transformation.js";

/* @param { String, math.js_library } */
function useLibrary(_libraryType, _library) {
	switch(_libraryType) {
		case "mathjs":
			Constants.libraries.math = _library;
			break;
	}
}

const Geometry = {
	Transformation
};

export {
	Renderer,
	Image,
	Performance,
	useLibrary,
	Geometry
};
