"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTmpTsConfigForBuildableLibs = createTmpTsConfigForBuildableLibs;
const buildable_libs_utils_1 = require("@nx/js/src/utils/buildable-libs-utils");
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
function createTmpTsConfigForBuildableLibs(tsConfigPath, context, options) {
    let dependencies;
    const result = (0, buildable_libs_utils_1.calculateProjectDependencies)(options?.projectGraph ?? (0, devkit_1.readCachedProjectGraph)(), context.workspaceRoot, context.target.project, options?.target ?? context.target.target, context.target.configuration);
    dependencies = result.dependencies;
    const tmpTsConfigPath = (0, buildable_libs_utils_1.createTmpTsConfig)((0, path_1.join)(context.workspaceRoot, tsConfigPath), context.workspaceRoot, result.target.data.root, dependencies);
    process.env.NX_TSCONFIG_PATH = tmpTsConfigPath;
    return { tsConfigPath: tmpTsConfigPath, dependencies };
}
