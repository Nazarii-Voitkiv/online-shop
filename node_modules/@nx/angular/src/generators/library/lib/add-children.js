"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChildren = addChildren;
const devkit_1 = require("@nx/devkit");
const js_1 = require("@nx/js");
const ast_utils_1 = require("../../../utils/nx-devkit/ast-utils");
const route_utils_1 = require("../../../utils/nx-devkit/route-utils");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
let tsModule;
function addChildren(tree, options) {
    if (!tree.exists(options.parent)) {
        throw new Error(`Cannot find '${options.parent}'`);
    }
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const routeFileSource = tree.read(options.parent, 'utf-8');
    const constName = options.standalone
        ? `${(0, devkit_1.names)(options.name).propertyName}Routes`
        : `${(0, devkit_1.names)(options.fileName).propertyName}Routes`;
    const importPath = options.importPath;
    let sourceFile = tsModule.createSourceFile(options.parent, routeFileSource, tsModule.ScriptTarget.Latest, true);
    if (!options.standalone) {
        sourceFile = (0, ast_utils_1.addImportToModule)(tree, sourceFile, options.parent, options.moduleName);
    }
    sourceFile = (0, js_1.insertImport)(tree, sourceFile, options.parent, options.standalone ? constName : `${options.moduleName}, ${constName}`, importPath);
    const route = `{ path: '${(0, devkit_1.names)(options.fileName).fileName}', children: ${constName} }`;
    (0, route_utils_1.addRoute)(tree, options.parent, route, false, constName, importPath);
}
