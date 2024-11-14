"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStories = generateStories;
const devkit_1 = require("@nx/devkit");
const stories_1 = require("../../stories/stories");
async function generateStories(tree, options) {
    const project = (0, devkit_1.readProjectConfiguration)(tree, options.project);
    await (0, stories_1.angularStoriesGenerator)(tree, {
        name: options.project,
        ignorePaths: options.ignorePaths,
        interactionTests: options.interactionTests,
        skipFormat: true,
    });
}
