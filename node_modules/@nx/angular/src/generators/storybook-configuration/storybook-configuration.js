"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storybookConfigurationGenerator = storybookConfigurationGenerator;
const devkit_1 = require("@nx/devkit");
const update_app_editor_tsconfig_excluded_files_1 = require("../utils/update-app-editor-tsconfig-excluded-files");
const assert_compatible_storybook_version_1 = require("./lib/assert-compatible-storybook-version");
const generate_stories_1 = require("./lib/generate-stories");
const generate_storybook_configuration_1 = require("./lib/generate-storybook-configuration");
async function storybookConfigurationGenerator(tree, options) {
    (0, assert_compatible_storybook_version_1.assertCompatibleStorybookVersion)();
    const storybookGeneratorInstallTask = await (0, generate_storybook_configuration_1.generateStorybookConfiguration)(tree, {
        ...options,
        interactionTests: options.interactionTests ?? true, // default is true
        tsConfiguration: options.tsConfiguration ?? true, // default is true
    });
    if (options.generateStories) {
        await (0, generate_stories_1.generateStories)(tree, {
            ...options,
            interactionTests: options.interactionTests ?? true,
            skipFormat: true,
        });
    }
    const project = (0, devkit_1.readProjectConfiguration)(tree, options.project);
    if (project.projectType === 'application') {
        (0, update_app_editor_tsconfig_excluded_files_1.updateAppEditorTsConfigExcludedFiles)(tree, project);
    }
    if (!options.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
    return storybookGeneratorInstallTask;
}
exports.default = storybookConfigurationGenerator;
