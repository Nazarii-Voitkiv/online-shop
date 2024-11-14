"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRemotes = startRemotes;
const devkit_1 = require("@nx/devkit");
async function startRemotes(remotes, workspaceProjects, options, context, target = 'serve') {
    const remoteIters = [];
    for (const app of remotes) {
        if (!workspaceProjects[app].targets?.[target]) {
            throw new Error(`Could not find "${target}" target in "${app}" project.`);
        }
        else if (!workspaceProjects[app].targets?.[target].executor) {
            throw new Error(`Could not find executor for "${target}" target in "${app}" project.`);
        }
        const [collection, executor] = workspaceProjects[app].targets[target].executor.split(':');
        const isUsingModuleFederationDevServerExecutor = executor.includes('module-federation-dev-server');
        const configurationOverride = options.devRemotes.find((r) => typeof r !== 'string' && r.remoteName === app)?.configuration;
        remoteIters.push(await (0, devkit_1.runExecutor)({
            project: app,
            target,
            configuration: configurationOverride ?? context.configurationName,
        }, {
            ...(target === 'serve' ? { verbose: options.verbose ?? false } : {}),
            ...(isUsingModuleFederationDevServerExecutor
                ? { isInitialHost: false }
                : {}),
        }, context));
    }
    return remoteIters;
}
