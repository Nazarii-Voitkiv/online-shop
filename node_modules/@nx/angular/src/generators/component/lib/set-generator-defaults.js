"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGeneratorDefaults = setGeneratorDefaults;
const devkit_1 = require("@nx/devkit");
function setGeneratorDefaults(tree, options) {
    const nxJson = (0, devkit_1.readNxJson)(tree);
    nxJson.generators = nxJson.generators ?? {};
    nxJson.generators['@nx/angular:component'] = {
        style: options.style,
        ...(nxJson.generators['@nx/angular:component'] || {}),
    };
    (0, devkit_1.updateNxJson)(tree, nxJson);
}
