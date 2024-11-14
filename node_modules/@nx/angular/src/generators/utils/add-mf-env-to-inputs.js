"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMfEnvToTargetDefaultInputs = addMfEnvToTargetDefaultInputs;
const devkit_1 = require("@nx/devkit");
function addMfEnvToTargetDefaultInputs(tree) {
    const nxJson = (0, devkit_1.readNxJson)(tree);
    const webpackExecutor = '@nx/angular:webpack-browser';
    const mfEnvVar = 'NX_MF_DEV_REMOTES';
    const inputs = [
        ...(nxJson.namedInputs && 'production' in nxJson.namedInputs
            ? ['production', '^production']
            : ['default', '^default']),
    ];
    nxJson.targetDefaults ??= {};
    nxJson.targetDefaults[webpackExecutor] ??= {};
    nxJson.targetDefaults[webpackExecutor].inputs ??= inputs;
    nxJson.targetDefaults[webpackExecutor].dependsOn ??= ['^build'];
    let mfEnvVarExists = false;
    for (const input of nxJson.targetDefaults[webpackExecutor].inputs) {
        if (typeof input === 'object' && input['env'] === mfEnvVar) {
            mfEnvVarExists = true;
            break;
        }
    }
    if (!mfEnvVarExists) {
        nxJson.targetDefaults[webpackExecutor].inputs.push({ env: mfEnvVar });
    }
    nxJson.targetDefaults[webpackExecutor].cache = true;
    (0, devkit_1.updateNxJson)(tree, nxJson);
}
