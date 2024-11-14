"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemotesWithPorts = getRemotesWithPorts;
const devkit_1 = require("@nx/devkit");
function getRemotesWithPorts(host, options) {
    // If type is host and remotes supplied, check remotes exist
    const remotesWithPort = [];
    if (options.mfType === 'host' &&
        Array.isArray(options.remotes) &&
        options.remotes.length > 0) {
        for (const remote of options.remotes) {
            const remoteConfig = (0, devkit_1.readProjectConfiguration)(host, remote);
            remotesWithPort.push({
                remoteName: remote,
                port: remoteConfig.targets['serve']?.options?.port ?? 4200,
            });
        }
    }
    return remotesWithPort;
}
