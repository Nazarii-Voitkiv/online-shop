"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.move = move;
const devkit_1 = require("@nx/devkit");
const lib_1 = require("./lib");
/**
 * Angular-specific logic to move a project to another directory.
 * This is invoked by the `@nx/workspace:move` generator.
 */
async function move(tree, options) {
    // while the project has already being moved at this point, the changes are
    // still in the virtual tree and haven't been committed, so the project graph
    // still contains the old project name
    if (!(await isAngularProject(options.oldProjectName))) {
        return;
    }
    (0, lib_1.updateModuleName)(tree, options);
    (0, lib_1.updateNgPackage)(tree, options);
    (0, lib_1.updateSecondaryEntryPoints)(tree, options);
}
async function isAngularProject(project) {
    const projectGraph = await (0, devkit_1.createProjectGraphAsync)();
    return projectGraph.dependencies[project]?.some((dependency) => dependency.target === 'npm:@angular/core');
}
