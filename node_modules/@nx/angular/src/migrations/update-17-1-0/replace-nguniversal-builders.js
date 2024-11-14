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
            if (target.executor === '@nguniversal/builders:ssr-dev-server') {
                target.executor = '@angular-devkit/build-angular:ssr-dev-server';
            }
            else if (target.executor === '@nguniversal/builders:prerender') {
                target.executor = '@angular-devkit/build-angular:prerender';
                updatePrerenderOptions(target);
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
        if (targetOrExecutor === '@nguniversal/builders:ssr-dev-server') {
            nxJson.targetDefaults['@angular-devkit/build-angular:ssr-dev-server'] =
                targetConfig;
            delete nxJson.targetDefaults['@nguniversal/builders:ssr-dev-server'];
        }
        else if (targetOrExecutor === '@nguniversal/builders:prerender') {
            nxJson.targetDefaults['@angular-devkit/build-angular:prerender'] =
                targetConfig;
            delete nxJson.targetDefaults['@nguniversal/builders:prerender'];
            updatePrerenderOptions(targetConfig);
        }
        else if (targetConfig.executor === '@nguniversal/builders:ssr-dev-server') {
            targetConfig.executor = '@angular-devkit/build-angular:ssr-dev-server';
        }
        else if (targetConfig.executor === '@nguniversal/builders:prerender') {
            targetConfig.executor = '@angular-devkit/build-angular:prerender';
            updatePrerenderOptions(targetConfig);
        }
    }
    (0, devkit_1.updateNxJson)(tree, nxJson);
    // remove @nguniversal/builders from package.json
    (0, devkit_1.removeDependenciesFromPackageJson)(tree, ['@nguniversal/builders'], ['@nguniversal/builders']);
    await (0, devkit_1.formatFiles)(tree);
}
function* allTargetOptions(target) {
    if (target.options) {
        yield [undefined, target.options];
    }
    if (!target.configurations) {
        return;
    }
    for (const [name, options] of Object.entries(target.configurations)) {
        if (options !== undefined) {
            yield [name, options];
        }
    }
}
function updatePrerenderOptions(config) {
    for (const [, options] of allTargetOptions(config)) {
        if (options.guessRoutes !== undefined) {
            options.discoverRoutes = options.guessRoutes;
            delete options.guessRoutes;
        }
        if (options.numProcesses !== undefined) {
            delete options.numProcesses;
        }
    }
}
