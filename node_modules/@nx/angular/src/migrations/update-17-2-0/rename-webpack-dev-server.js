"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const devkit_1 = require("@nx/devkit");
async function default_1(tree) {
    const projects = (0, devkit_1.getProjects)(tree);
    for (const [, project] of projects) {
        if (project.projectType !== 'application') {
            continue;
        }
        for (const target of Object.values(project.targets ?? {})) {
            if (target.executor === '@nx/angular:webpack-dev-server' ||
                target.executor === '@nrwl/angular:webpack-dev-server') {
                target.executor = '@nx/angular:dev-server';
            }
        }
        (0, devkit_1.updateProjectConfiguration)(tree, project.name, project);
    }
    // update options from nx.json target defaults
    const nxJson = (0, devkit_1.readNxJson)(tree);
    if (!nxJson.targetDefaults) {
        return;
    }
    for (const [targetOrExecutor, targetConfig] of Object.entries(nxJson.targetDefaults)) {
        if (targetOrExecutor === '@nx/angular:webpack-dev-server') {
            nxJson.targetDefaults['@nx/angular:dev-server'] = targetConfig;
            delete nxJson.targetDefaults['@nx/angular:webpack-dev-server'];
        }
        else if (targetOrExecutor === '@nrwl/angular:webpack-dev-server') {
            nxJson.targetDefaults['@nx/angular:dev-server'] = targetConfig;
            delete nxJson.targetDefaults['@nrwl/angular:webpack-dev-server'];
        }
        else if (targetConfig.executor === '@nx/angular:webpack-dev-server' ||
            targetConfig.executor === '@nrwl/angular:webpack-dev-server') {
            targetConfig.executor = '@nx/angular:dev-server';
        }
    }
    (0, devkit_1.updateNxJson)(tree, nxJson);
    await (0, devkit_1.formatFiles)(tree);
}
