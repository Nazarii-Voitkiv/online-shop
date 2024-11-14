"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilesFromTemplates = generateFilesFromTemplates;
const devkit_1 = require("@nx/devkit");
const semver_1 = require("semver");
function generateFilesFromTemplates(tree, options) {
    const projectNames = (0, devkit_1.names)(options.name);
    const fileName = options.subdirectory
        ? (0, devkit_1.joinPathFragments)(options.subdirectory, projectNames.fileName)
        : projectNames.fileName;
    (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, '..', 'files'), options.parentDirectory, {
        ...options,
        ...projectNames,
        fileName,
        relativeFileName: projectNames.fileName,
        importFromOperators: (0, semver_1.lt)(options.rxjsVersion, '7.2.0'),
        tmpl: '',
    });
    if (!options.facade) {
        tree.delete((0, devkit_1.joinPathFragments)(options.parentDirectory, options.directory, `${options.subdirectory ? `${options.subdirectory}/` : ''}${projectNames.fileName}.facade.ts`));
        tree.delete((0, devkit_1.joinPathFragments)(options.parentDirectory, options.directory, `${options.subdirectory ? `${options.subdirectory}/` : ''}${projectNames.fileName}.facade.spec.ts`));
    }
}
