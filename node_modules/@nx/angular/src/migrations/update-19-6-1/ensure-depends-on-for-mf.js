"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const devkit_1 = require("@nx/devkit");
const executor_options_utils_1 = require("@nx/devkit/src/generators/executor-options-utils");
async function default_1(tree) {
    let usesModuleFederation = false;
    (0, executor_options_utils_1.forEachExecutorOptions)(tree, '@nx/angular:webpack-browser', (options, projectName, targetName) => {
        const webpackConfig = options.webpackConfig;
        if (!webpackConfig) {
            return;
        }
        const webpackContents = tree.read(webpackConfig, 'utf-8');
        if (['withModuleFederation', 'withModuleFederationForSSR'].some((p) => webpackContents.includes(p))) {
            usesModuleFederation = true;
        }
    });
    if (!usesModuleFederation) {
        return;
    }
    const nxJson = (0, devkit_1.readNxJson)(tree);
    const nxMFDevRemotesEnvVar = 'NX_MF_DEV_REMOTES';
    const inputs = [
        ...(nxJson.namedInputs && 'production' in nxJson.namedInputs
            ? ['production', '^production']
            : ['default', '^default']),
        { env: nxMFDevRemotesEnvVar },
    ];
    if (!nxJson.targetDefaults ||
        !nxJson.targetDefaults?.['@nx/angular:webpack-browser']) {
        nxJson.targetDefaults ??= {};
        nxJson.targetDefaults['@nx/angular:webpack-browser'] = {
            cache: true,
            inputs,
            dependsOn: ['^build'],
        };
    }
    else {
        nxJson.targetDefaults['@nx/angular:webpack-browser'].dependsOn ??= [];
        if (!nxJson.targetDefaults['@nx/angular:webpack-browser'].dependsOn.includes('^build')) {
            nxJson.targetDefaults['@nx/angular:webpack-browser'].dependsOn.push('^build');
        }
        nxJson.targetDefaults['@nx/angular:webpack-browser'].inputs ??= [];
        if (!nxJson.targetDefaults['@nx/angular:webpack-browser'].inputs.find((i) => typeof i === 'string' ? false : i['env'] === nxMFDevRemotesEnvVar)) {
            nxJson.targetDefaults['@nx/angular:webpack-browser'].inputs.push({
                env: nxMFDevRemotesEnvVar,
            });
        }
    }
    (0, devkit_1.updateNxJson)(tree, nxJson);
    await (0, devkit_1.formatFiles)(tree);
}
