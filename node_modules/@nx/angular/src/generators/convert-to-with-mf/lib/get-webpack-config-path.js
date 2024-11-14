"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackConfigPath = getWebpackConfigPath;
function getWebpackConfigPath(project, projectName) {
    let pathToWebpackConfig = '';
    for (const target of Object.values(project.targets ?? {})) {
        if ((target.executor === '@nx/angular:webpack-browser' ||
            target.executor === '@nrwl/angular:webpack-browser') &&
            target.options.customWebpackConfig?.path) {
            pathToWebpackConfig = target.options.customWebpackConfig?.path;
            break;
        }
    }
    if (!pathToWebpackConfig) {
        throw new Error(`Could not find webpack config for \`${projectName}\` in your workspace.`);
    }
    return pathToWebpackConfig;
}
