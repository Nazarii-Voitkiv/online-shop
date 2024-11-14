"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeBuildTarget = changeBuildTarget;
const devkit_1 = require("@nx/devkit");
const target_defaults_utils_1 = require("@nx/devkit/src/generators/target-defaults-utils");
function changeBuildTarget(host, options) {
    const appConfig = (0, devkit_1.readProjectConfiguration)(host, options.appName);
    const configExtName = options.typescriptConfiguration ? 'ts' : 'js';
    appConfig.targets.build.executor = '@nx/angular:webpack-browser';
    appConfig.targets.build.options = {
        ...appConfig.targets.build.options,
        customWebpackConfig: {
            path: `${appConfig.root}/webpack.config.${configExtName}`,
        },
    };
    appConfig.targets.build.configurations.production = {
        ...appConfig.targets.build.configurations.production,
        customWebpackConfig: {
            path: `${appConfig.root}/webpack.prod.config.${configExtName}`,
        },
    };
    (0, devkit_1.updateProjectConfiguration)(host, options.appName, appConfig);
    (0, target_defaults_utils_1.addBuildTargetDefaults)(host, '@nx/angular:webpack-browser');
}
