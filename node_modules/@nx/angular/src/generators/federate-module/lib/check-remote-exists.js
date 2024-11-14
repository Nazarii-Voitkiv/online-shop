"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemoteIfExists = getRemoteIfExists;
const devkit_1 = require("@nx/devkit");
function getRemoteIfExists(tree, remote) {
    const remoteProject = getRemote(tree, remote);
    if (!remoteProject) {
        return false;
    }
    const hasModuleFederationConfig = tree.exists((0, devkit_1.joinPathFragments)(remoteProject.root, 'module-federation.config.ts')) ||
        tree.exists((0, devkit_1.joinPathFragments)(remoteProject.root, 'module-federation.config.js'));
    return hasModuleFederationConfig ? remoteProject : false;
}
function getRemote(tree, remote) {
    try {
        return (0, devkit_1.readProjectConfiguration)(tree, remote);
    }
    catch {
        return false;
    }
}
