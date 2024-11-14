"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppEditorTsConfigExcludedFiles = updateAppEditorTsConfigExcludedFiles;
const devkit_1 = require("@nx/devkit");
function updateAppEditorTsConfigExcludedFiles(tree, projectConfig) {
    if (projectConfig.projectType !== 'application') {
        return;
    }
    const editorTsConfigPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.editor.json');
    const appTsConfigPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.app.json');
    if (!tree.exists(editorTsConfigPath) || !tree.exists(appTsConfigPath)) {
        return;
    }
    const appTsConfig = (0, devkit_1.readJson)(tree, appTsConfigPath);
    (0, devkit_1.updateJson)(tree, editorTsConfigPath, (json) => {
        const exclude = [...(json.exclude ?? []), ...(appTsConfig.exclude ?? [])];
        if (exclude.length) {
            json.exclude = Array.from(new Set(exclude));
        }
        return json;
    });
}
