"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFileToRemoteTsconfig = addFileToRemoteTsconfig;
const devkit_1 = require("@nx/devkit");
function addFileToRemoteTsconfig(tree, remoteName, pathToExpose) {
    const remote = (0, devkit_1.readProjectConfiguration)(tree, remoteName);
    (0, devkit_1.updateJson)(tree, remote.targets.build.options.tsConfig, (json) => ({
        ...json,
        files: [
            ...json.files,
            (0, devkit_1.joinPathFragments)((0, devkit_1.offsetFromRoot)(remote.root), pathToExpose),
        ],
    }));
}
