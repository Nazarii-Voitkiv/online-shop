"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectEntryPoints = getProjectEntryPoints;
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
function getProjectEntryPoints(tree, projectName) {
    const { root, sourceRoot, projectType } = (0, devkit_1.readProjectConfiguration)(tree, projectName);
    const rootEntryPoint = {
        name: '',
        path: normalizeMainEntryPointSourceRoot(tree, root, sourceRoot, projectType),
    };
    const entryPointRootPaths = [rootEntryPoint];
    if (projectType === 'application') {
        return entryPointRootPaths;
    }
    collectLibrarySecondaryEntryPoints(tree, root, entryPointRootPaths);
    // since the root includes some secondary entry points, we need to ignore
    // them when processing the main entry point
    if (rootEntryPoint.path === root && entryPointRootPaths.length > 1) {
        rootEntryPoint.excludeDirs = entryPointRootPaths
            .slice(1)
            .map((entryPoint) => entryPoint.path);
    }
    return entryPointRootPaths;
}
function collectLibrarySecondaryEntryPoints(tree, root, entryPointPaths) {
    const exclude = new Set([`${root}/ng-package.json`, `${root}/package.json`]);
    (0, devkit_1.visitNotIgnoredFiles)(tree, root, (path) => {
        const normalizedPath = (0, devkit_1.normalizePath)(path);
        if (!tree.isFile(normalizedPath) || exclude.has(normalizedPath)) {
            return;
        }
        const fileName = (0, path_1.basename)(normalizedPath);
        if (fileName !== 'ng-package.json' &&
            (fileName !== 'package.json' ||
                (fileName === 'package.json' &&
                    !(0, devkit_1.readJson)(tree, normalizedPath).ngPackage))) {
            return;
        }
        const entryPointPath = getSourcePath(tree, (0, devkit_1.normalizePath)((0, path_1.dirname)(normalizedPath)), 'lib');
        entryPointPaths.push({
            name: (0, path_1.basename)((0, path_1.dirname)(normalizedPath)),
            path: entryPointPath,
        });
    });
}
function normalizeMainEntryPointSourceRoot(tree, root, sourceRoot, projectType) {
    const projectTypeDir = projectType === 'application' ? 'app' : 'lib';
    if (sourceRoot) {
        return [(0, devkit_1.joinPathFragments)(sourceRoot, projectTypeDir), sourceRoot].find((path) => tree.exists(path));
    }
    return getSourcePath(tree, root, projectTypeDir) ?? root;
}
function getSourcePath(tree, basePath, projectTypeDir) {
    const candidatePaths = [
        (0, devkit_1.joinPathFragments)(basePath, 'src', projectTypeDir),
        (0, devkit_1.joinPathFragments)(basePath, 'src'),
        (0, devkit_1.joinPathFragments)(basePath, projectTypeDir),
        basePath,
    ];
    return candidatePaths.find((candidatePath) => tree.exists(candidatePath));
}
