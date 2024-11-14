"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNgPackage = updateNgPackage;
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
function updateNgPackage(tree, schema) {
    const project = (0, devkit_1.readProjectConfiguration)(tree, schema.newProjectName);
    if (project.projectType === 'application') {
        return;
    }
    const ngPackagePath = `${project.root}/ng-package.json`;
    if (!tree.exists(ngPackagePath)) {
        return;
    }
    const rootOffset = (0, devkit_1.normalizePath)((0, path_1.relative)((0, path_1.join)(devkit_1.workspaceRoot, project.root), devkit_1.workspaceRoot));
    const outputs = (0, devkit_1.getOutputsForTargetAndConfiguration)({
        project: schema.newProjectName,
        target: 'build',
    }, {}, {
        name: schema.newProjectName,
        type: 'lib',
        data: {
            root: project.root,
            targets: project.targets,
        },
    });
    const output = outputs[0] ?? `dist/${project.root}`;
    (0, devkit_1.updateJson)(tree, ngPackagePath, (json) => {
        json.dest = `${rootOffset}/${output}`;
        return json;
    });
}
