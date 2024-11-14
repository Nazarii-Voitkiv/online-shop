"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeNewWebpackConfig = writeNewWebpackConfig;
const is_host_remote_config_1 = require("./is-host-remote-config");
function writeNewWebpackConfig(ast, mfType, projectName) {
    const webpackConfig = `const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');
module.exports = withModuleFederation(config);
`;
    let mfeConfig = '';
    if (!mfType) {
        mfeConfig = `
        module.exports = {
          name: '${projectName}',
        };`;
    }
    else if (mfType === 'host') {
        const remotes = hostRemotesToString(ast);
        mfeConfig = `
        module.exports = {
          name: '${projectName}',
          remotes: ${remotes},
        };`;
    }
    else if (mfType === 'remote') {
        const exposedModules = (0, is_host_remote_config_1.getExposedModulesFromRemote)(ast);
        mfeConfig = `
        module.exports = {
          name: '${projectName}',
          exposes: ${exposedModules},
        };`;
    }
    else if (mfType === 'both') {
        const remotes = hostRemotesToString(ast);
        const exposedModules = (0, is_host_remote_config_1.getExposedModulesFromRemote)(ast);
        mfeConfig = `
    module.exports = {
      name: '${projectName}',
      remotes: ${remotes},
      exposes: ${exposedModules},
    };`;
    }
    return [webpackConfig, mfeConfig];
}
function hostRemotesToString(ast) {
    const remotes = (0, is_host_remote_config_1.getRemotesFromHost)(ast)
        .reduce((acc, remotePair) => `['${remotePair[0]}', '${remotePair[1]}'], ${acc}`, '')
        .trim();
    return `[${remotes.endsWith(',') ? remotes.slice(0, -1) : remotes}]`;
}
