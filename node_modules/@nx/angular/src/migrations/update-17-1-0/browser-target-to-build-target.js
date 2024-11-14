"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executors = void 0;
exports.default = default_1;
const devkit_1 = require("@nx/devkit");
const executor_options_utils_1 = require("@nx/devkit/src/generators/executor-options-utils");
exports.executors = [
    '@angular-devkit/build-angular:dev-server',
    '@angular-devkit/build-angular:extract-i18n',
    '@nx/angular:module-federation-dev-server',
    '@nx/angular:webpack-dev-server',
];
async function default_1(tree) {
    // update options from project configs
    exports.executors.forEach((executor) => {
        (0, executor_options_utils_1.forEachExecutorOptions)(tree, executor, (_, project, target, configuration) => {
            const projectConfiguration = (0, devkit_1.readProjectConfiguration)(tree, project);
            const config = configuration
                ? projectConfiguration.targets[target].configurations[configuration]
                : projectConfiguration.targets[target].options;
            updateConfig(config);
            (0, devkit_1.updateProjectConfiguration)(tree, project, projectConfiguration);
        });
    });
    // update options from nx.json target defaults
    const nxJson = (0, devkit_1.readNxJson)(tree);
    if (!nxJson.targetDefaults) {
        return;
    }
    for (const [targetOrExecutor, targetConfig] of Object.entries(nxJson.targetDefaults)) {
        if (!exports.executors.includes(targetOrExecutor) &&
            !exports.executors.includes(targetConfig.executor)) {
            continue;
        }
        if (targetConfig.options) {
            updateConfig(targetConfig.options);
        }
        Object.values(targetConfig.configurations ?? {}).forEach((config) => {
            updateConfig(config);
        });
    }
    (0, devkit_1.updateNxJson)(tree, nxJson);
    await (0, devkit_1.formatFiles)(tree);
}
function updateConfig(config) {
    if (config && config.browserTarget) {
        config.buildTarget ??= config.browserTarget;
        delete config.browserTarget;
    }
}
