"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPathToTsConfig = addPathToTsConfig;
const devkit_1 = require("@nx/devkit");
const js_1 = require("@nx/js");
function addPathToTsConfig(tree, { remoteName, moduleName, pathToFile }) {
    const rootTsConfig = (0, devkit_1.readJson)(tree, (0, js_1.getRootTsConfigPathInTree)(tree));
    if (!rootTsConfig.compilerOptions?.paths[`${remoteName}/${moduleName}`]) {
        (0, js_1.addTsConfigPath)(tree, `${remoteName}/${moduleName}`, [pathToFile]);
    }
}
