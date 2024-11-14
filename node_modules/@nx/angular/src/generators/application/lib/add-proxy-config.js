"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProxyConfig = addProxyConfig;
const devkit_1 = require("@nx/devkit");
function addProxyConfig(host, options) {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(host, options.name);
    if (projectConfig.targets && projectConfig.targets.serve) {
        const pathToProxyFile = `${projectConfig.root}/proxy.conf.json`;
        if (!host.exists(pathToProxyFile)) {
            host.write(pathToProxyFile, '{}');
        }
        (0, devkit_1.updateJson)(host, pathToProxyFile, (json) => ({
            [`/${options.backendProject}`]: {
                target: 'http://localhost:3333',
                secure: false,
            },
        }));
        projectConfig.targets.serve.options = {
            ...projectConfig.targets.serve.options,
            proxyConfig: pathToProxyFile,
        };
        (0, devkit_1.updateProjectConfiguration)(host, options.name, projectConfig);
    }
}
