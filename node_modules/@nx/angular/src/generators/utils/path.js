"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelativeImportToFile = getRelativeImportToFile;
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
function getRelativeImportToFile(sourceFilePath, targetFilePath) {
    const relativeDirToTarget = (0, path_1.relative)((0, path_1.dirname)(sourceFilePath), (0, path_1.dirname)(targetFilePath));
    return `./${(0, devkit_1.joinPathFragments)(relativeDirToTarget, (0, path_1.basename)(targetFilePath, '.ts'))}`;
}
