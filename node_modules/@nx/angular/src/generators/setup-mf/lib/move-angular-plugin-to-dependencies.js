"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveAngularPluginToDependencies = moveAngularPluginToDependencies;
const devkit_1 = require("@nx/devkit");
function moveAngularPluginToDependencies(tree) {
    const packageJson = (0, devkit_1.readJson)(tree, 'package.json');
    if (packageJson.dependencies?.['@nx/angular']) {
        return;
    }
    packageJson.dependencies ??= {};
    packageJson.dependencies['@nx/angular'] =
        packageJson.devDependencies['@nx/angular'];
    delete packageJson.devDependencies['@nx/angular'];
    (0, devkit_1.writeJson)(tree, 'package.json', packageJson);
}
