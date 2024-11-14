"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = validateOptions;
const devkit_1 = require("@nx/devkit");
const validations_1 = require("../../utils/validations");
function validateOptions(tree, options) {
    validateProject(tree, options.project);
    validateBuildTarget(tree, options.project);
}
function validateProject(tree, project) {
    (0, validations_1.validateProject)(tree, project);
    const { projectType } = (0, devkit_1.readProjectConfiguration)(tree, project);
    if (projectType !== 'application') {
        throw new Error(`The "${project}" project is not an application. Only application projects are supported by the "setup-ssr" generator.`);
    }
}
function validateBuildTarget(tree, project) {
    const { targets } = (0, devkit_1.readProjectConfiguration)(tree, project);
    if (!targets?.build) {
        throw new Error(`The "${project}" project does not have a "build" target. Please add a "build" target.`);
    }
}
