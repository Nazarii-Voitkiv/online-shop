"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeCustomWebpackConfig = mergeCustomWebpackConfig;
exports.resolveCustomWebpackConfig = resolveCustomWebpackConfig;
exports.resolveIndexHtmlTransformer = resolveIndexHtmlTransformer;
const webpack_merge_1 = require("webpack-merge");
const internal_1 = require("@nx/js/src/internal");
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
const fs_1 = require("fs");
async function mergeCustomWebpackConfig(baseWebpackConfig, pathToWebpackConfig, options, target) {
    const customWebpackConfiguration = resolveCustomWebpackConfig(pathToWebpackConfig, options.tsConfig.startsWith(devkit_1.workspaceRoot)
        ? options.tsConfig
        : (0, path_1.join)(devkit_1.workspaceRoot, options.tsConfig));
    // The extra Webpack configuration file can also export a Promise, for instance:
    // `module.exports = new Promise(...)`. If it exports a single object, but not a Promise,
    // then await will just resolve that object.
    const config = await customWebpackConfiguration;
    let newConfig;
    if (typeof config === 'function') {
        // The extra Webpack configuration file can export a synchronous or asynchronous function,
        // for instance: `module.exports = async config => { ... }`.
        newConfig = await config(baseWebpackConfig, options, target);
    }
    else {
        newConfig = (0, webpack_merge_1.merge)(baseWebpackConfig, config);
    }
    // license-webpack-plugin will at times try to scan the monorepo's root package.json
    // This will result in an error being thrown
    // Ensure root package.json is excluded
    const licensePlugin = newConfig.plugins.find((p) => p.constructor.name === 'LicenseWebpackPlugin');
    if (licensePlugin) {
        let rootPackageJsonName;
        const pathToRootPackageJson = (0, path_1.join)(newConfig.context.root ?? devkit_1.workspaceRoot, 'package.json');
        if ((0, fs_1.existsSync)(pathToRootPackageJson)) {
            try {
                const rootPackageJson = JSON.parse((0, fs_1.readFileSync)(pathToRootPackageJson, 'utf-8'));
                rootPackageJsonName = rootPackageJson.name;
                licensePlugin.pluginOptions.excludedPackageTest = (pkgName) => {
                    if (!rootPackageJsonName) {
                        return false;
                    }
                    return pkgName === rootPackageJsonName;
                };
            }
            catch {
                // do nothing
            }
        }
    }
    return newConfig;
}
function resolveCustomWebpackConfig(path, tsConfig) {
    const cleanupTranspiler = (0, internal_1.registerTsProject)(tsConfig);
    const customWebpackConfig = require(path);
    cleanupTranspiler();
    // If the user provides a configuration in TS file
    // then there are 2 cases for exporting an object. The first one is:
    // `module.exports = { ... }`. And the second one is:
    // `export default { ... }`. The ESM format is compiled into:
    // `{ default: { ... } }`
    return customWebpackConfig.default ?? customWebpackConfig;
}
function resolveIndexHtmlTransformer(path, tsConfig, target) {
    const cleanupTranspiler = (0, internal_1.registerTsProject)(tsConfig);
    const indexTransformer = require(path);
    cleanupTranspiler();
    const transform = indexTransformer.default ?? indexTransformer;
    return (indexHtml) => transform(target, indexHtml);
}
