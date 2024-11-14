"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLibPackageNpmScope = updateLibPackageNpmScope;
const devkit_1 = require("@nx/devkit");
function updateLibPackageNpmScope(host, options) {
    return (0, devkit_1.updateJson)(host, `${options.projectRoot}/package.json`, (json) => {
        json.name = options.importPath;
        return json;
    });
}
