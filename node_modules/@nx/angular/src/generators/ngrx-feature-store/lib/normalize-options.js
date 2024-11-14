"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = normalizeOptions;
const devkit_1 = require("@nx/devkit");
const semver_1 = require("@nx/devkit/src/utils/semver");
const path_1 = require("path");
const versions_1 = require("../../../utils/versions");
function normalizeOptions(tree, options) {
    let rxjsVersion;
    try {
        rxjsVersion = (0, semver_1.checkAndCleanWithSemver)('rxjs', (0, devkit_1.readJson)(tree, 'package.json').dependencies['rxjs']);
    }
    catch {
        rxjsVersion = (0, semver_1.checkAndCleanWithSemver)('rxjs', versions_1.rxjsVersion);
    }
    const { subdirectory, name } = determineSubdirectoryAndName(options.name);
    return {
        ...options,
        name,
        subdirectory,
        parentDirectory: options.parent ? (0, path_1.dirname)(options.parent) : undefined,
        route: options.route === '' ? `''` : options.route ?? `''`,
        directory: (0, devkit_1.names)(options.directory).fileName,
        rxjsVersion,
    };
}
function determineSubdirectoryAndName(name) {
    if (name.includes('/')) {
        const parts = name.split('/');
        const storeName = parts.pop();
        const subdirectory = (0, devkit_1.joinPathFragments)(...parts);
        return { subdirectory, name: storeName };
    }
    else {
        return { name };
    }
}
