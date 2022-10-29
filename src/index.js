import {Renderer} from "./renderer/renderer.js";
import Image from "./renderer/image.js";
import Performance from "./utils/performance.js";
import * as Constants from "./utils/constants.js";

/* @param { String, math.js_library } */
function useLibrary(_libraryType, _library) {
	switch(_libraryType) {
		case "mathjs":
			Constants.libraries.math = _library;
			break;
	}
}

export {
	Renderer,
	Image,
	Performance,
	useLibrary
};
