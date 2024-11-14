"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectPrefix = getProjectPrefix;
const devkit_1 = require("@nx/devkit");
function getProjectPrefix(tree, project) {
    return (0, devkit_1.readProjectConfiguration)(tree, project).prefix;
}
