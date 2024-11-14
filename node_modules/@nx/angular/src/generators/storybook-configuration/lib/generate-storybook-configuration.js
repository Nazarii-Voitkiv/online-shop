"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStorybookConfiguration = generateStorybookConfiguration;
const devkit_1 = require("@nx/devkit");
const versions_1 = require("../../../utils/versions");
async function generateStorybookConfiguration(tree, options) {
    const { configurationGenerator } = (0, devkit_1.ensurePackage)('@nx/storybook', versions_1.nxVersion);
    return await configurationGenerator(tree, {
        project: options.project,
        uiFramework: '@storybook/angular',
        linter: options.linter,
        tsConfiguration: options.tsConfiguration,
        interactionTests: options.interactionTests,
        configureStaticServe: options.configureStaticServe,
        skipFormat: true,
        addPlugin: false,
        addExplicitTargets: true,
    });
}
