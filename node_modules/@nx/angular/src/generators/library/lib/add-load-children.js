"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLoadChildren = addLoadChildren;
const devkit_1 = require("@nx/devkit");
const route_utils_1 = require("../../../utils/nx-devkit/route-utils");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
let tsModule;
function addLoadChildren(tree, options) {
    if (!tree.exists(options.parent)) {
        throw new Error(`Cannot find '${options.parent}'`);
    }
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const moduleSource = tree.read(options.parent, 'utf-8');
    const sourceFile = tsModule.createSourceFile(options.parent, moduleSource, tsModule.ScriptTarget.Latest, true);
    const route = `{ path: '${(0, devkit_1.names)(options.fileName).fileName}', loadChildren: () => import('${options.importPath}').then(m => m.${options.standalone
        ? `${(0, devkit_1.names)(options.name).propertyName}Routes`
        : options.moduleName}) }`;
    (0, route_utils_1.addRoute)(tree, options.parent, route);
}
