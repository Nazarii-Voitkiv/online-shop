"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBuildableLibraryProject = isBuildableLibraryProject;
const devkit_1 = require("@nx/devkit");
function isBuildableLibraryProject(tree, projectName) {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, projectName);
    return (projectConfig.projectType === 'library' && !!projectConfig.targets?.build);
}
